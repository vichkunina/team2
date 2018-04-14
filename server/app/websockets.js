'use strict';

const PassportMemStoreSessionGetter = require('./classes/PassportMemStoreSessionGetter');
const olesya = require('./tools/olesya');
const WebSocketServer = require('./classes/WebSocketServer');
const SendQueue = require('./classes/SendQueue');
const { queue } = require('async');
let LOGINS_CACHE = [];

const {
    ChatModel,
    UserModel,
    UserIdLoginModel,
    messageModelFactory
} = require('./models');
const sendQueue = new SendQueue();
const executeQueues = {};

module.exports = async function (app, sessionStore) {
    const sessionGetter = new PassportMemStoreSessionGetter(sessionStore);
    const wsServer = new WebSocketServer(app, sessionGetter);
    await updateLoginCache();
    console.info('Login cache ready!');
    setInterval(updateLoginCache, 300 * 1000);

    wsServer.on('authUserConnected', ({ socket, uid }) => {
        if (!executeQueues[uid]) {
            executeQueues[uid] = queue(async ({ action, data }, callback) => {
                await action(data);
                callback();
            });
        }

        socket.on('GetMessages', pushAction.bind(
            null,
            uid,
            execute.bind(null, wsServer, uid, GetMessages)
        ));
        socket.on('GetProfile', pushAction.bind(
            null,
            uid,
            execute.bind(null, wsServer, uid, GetProfile)
        ));
        socket.on('SearchByLogin', pushAction.bind(
            null,
            uid,
            execute.bind(null, wsServer, uid, SearchByLogin)
        ));
        socket.on('AddContact', pushAction.bind(null, uid, async (userId) => {
            try {
                const result = await AddContact(uid, userId);

                socket.emit('AddContactResult', {
                    success: true,
                    value: result
                });

                const me = getProfileFromUser(await UserModel.getById(uid));
                wsServer.emitByUID(userId, 'NewChat', me);
            } catch (error) {
                wsServer.emitByUID(uid, 'AddContactResult', {
                    success: false,
                    error: error.message || error.body
                });
            }
        }));
        socket.on('DeleteProfile', pushAction.bind(
            null,
            uid,
            execute.bind(null, wsServer, uid, DeleteProfile)
        ));
        socket.on('GetChatList', pushAction.bind(
            null,
            uid,
            execute.bind(null, wsServer, uid, GetChatList)
        ));
        socket.on('SendMessage', pushAction.bind(null, uid, async ({ chatId, text }) => {
            try {
                const message = await SendMessage(uid, chatId, text);
                const chat = await ChatModel.getById(chatId);

                wsServer.emitByUID(uid, 'SendMessageResult', {
                    success: true,
                    value: message
                });
                chat.users.forEach(userId => {
                    wsServer.emitByUID(userId, 'NewMessage', message);
                });
            } catch (error) {
                wsServer.emitByUID(uid, 'SendMessageResult', {
                    success: false,
                    error: error.message || error.body
                });
            }
        }));
        socket.on('AskOlesya', pushAction.bind(null, uid, async (text) => {
            try {
                const answer = await olesya.ask(text);

                wsServer.emitByUID(uid, 'AskOlesyaResult', {
                    success: true,
                    value: answer
                });
            } catch (error) {
                wsServer.emitByUID(uid, 'AskOlesyaResult', {
                    success: false,
                    error: error.message || error.body
                });
            }
        }));
        socket.on('disconnect', () => {
            if (wsServer.getUserConnectionsCount(uid) === 0) {
                delete executeQueues[uid];
            }
        });
    });
};

function pushAction(uid, action, data) {
    executeQueues[uid].push({ action, data });
}

async function execute(wsServer, uid, fn, data) {
    try {
        const result = await fn(uid, data);

        wsServer.emitByUID(uid, fn.name + 'Result', {
            success: true,
            value: result
        });
    } catch (error) {
        wsServer.emitByUID(uid, fn.name + 'Result', {
            success: false,
            error: error.message || error.body
        });
    }
}

async function SendMessage(uid, chatId, text) {
    const chat = await ChatModel.getById(chatId);

    if (chat.users.indexOf(uid) === -1) {
        throw new Error('Not your chat!');
    }

    const MessageModel = messageModelFactory(chatId);
    const message = new MessageModel({
        from: uid,
        body: text
    });

    sendQueue.push(chatId, message);
    message.chatId = chatId;

    return message;
}

async function DeleteProfile(uid) {
    return await UserModel.removeById(uid);
}

async function GetMessages(uid, { chatId, offset, limit }) {
    const chat = await ChatModel.getById(chatId);

    if (chat.users.indexOf(uid) === -1) {
        throw new Error('Not your chat!');
    }

    const MessageModel = messageModelFactory(chatId);

    return {
        chatId,
        messages: await MessageModel.getList({
            offset: offset || 0,
            limit: limit || 100
        })
    };
}

async function GetProfile(uid, userId) {
    const user = await UserModel.getById(userId || uid);

    return getProfileFromUser(user);
}

async function SearchByLogin(uid, login) {
    login = login.trim();

    if (!login.length) {
        throw new Error('Empty request!');
    }

    const me = await UserModel.getById(uid);
    const foundUsers = await findLoginInCache(login, me);

    if (foundUsers.length !== 0) {
        return foundUsers;
    }

    return findLoginInDB(login, me);
}

async function AddContact(uid, userId) {
    if (uid === userId) {
        throw new Error('You can\'t add yourself!');
    }

    const me = await UserModel.getById(uid);
    if (me.contacts.indexOf(userId) !== -1) {
        throw new Error('You have this contact!');
    }
    const he = await UserModel.getById(userId);

    me.addContact(he);

    const chat = new ChatModel({
        dialog: true
    });

    await chat.addUser(he);
    await chat.addUser(me);

    return getChatForEmit(chat, uid);
}

async function GetChatList(uid) {
    const user = await UserModel.getById(uid);

    const result = [];
    for (const chatId of user.chats) {
        const chat = await ChatModel.getById(chatId);
        const emitChat = await getChatForEmit(chat);

        result.push(emitChat);
    }

    return result;
}

async function getChatForEmit(chat) {
    const users = await chat.getByLink('users');

    return {
        id: chat.id,
        name: chat.name,
        dialog: chat.dialog,
        users: users.map(getProfileFromUser)
    };
}

function getProfileFromUser(user) {
    return {
        id: user.id,
        login: user.login,
        avatar: user.avatar
    };
}

async function updateLoginCache() {
    const iterator = UserIdLoginModel.getIterator();

    const newCache = [];
    let next = await iterator.next();
    while (next) {
        try {
            const user = await next.getByLink('userId');
            newCache.push(getProfileFromUser(user));
        } catch (error) {
            console.error(error.body);
        } finally {
            next = await iterator.next();
        }
    }

    LOGINS_CACHE = newCache;
}

async function findLoginInCache(str, me) {
    const foundUsers = [];

    for (const profile of LOGINS_CACHE) {
        const match = profile.login.toLowerCase().indexOf(str.toLowerCase()) !== -1;
        const notHave = me.contacts.indexOf(profile.id) === -1;
        const notMe = profile.id !== me.id;

        if (match && notHave && notMe) {
            foundUsers.push(profile);
        }
    }

    return foundUsers;
}

async function findLoginInDB(str, me) {
    const foundUsers = [];

    const allUsersIterator = UserIdLoginModel.getIterator();
    let userIdAndLogin = await allUsersIterator.next();
    while (userIdAndLogin) {
        const match = userIdAndLogin.login.toLowerCase().indexOf(str.toLowerCase()) !== -1;
        const notHave = me.contacts.indexOf(userIdAndLogin.userId) === -1;
        const notMe = userIdAndLogin.userId !== me.id;

        if (match && notHave && notMe) {
            try {
                const user = await userIdAndLogin.getByLink('userId');
                foundUsers.push(user);
            } catch (error) {
                console.error(error.message);
            }
        }
        userIdAndLogin = await allUsersIterator.next();
    }

    return foundUsers;
}
