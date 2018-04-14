/* eslint-disable new-cap */
'use strict';

const PassportMemStoreSessionGetter = require('./classes/PassportMemStoreSessionGetter');
const olesya = require('./tools/olesya');
const WebSocketServer = require('./classes/WebSocketServer');

const {
    ChatModel,
    UserModel,
    UserIdLoginModel,
    messageModelFactory
} = require('./models');

module.exports = function (app, sessionStore) {
    const sessionGetter = new PassportMemStoreSessionGetter(sessionStore);
    const wsServer = new WebSocketServer(app, sessionGetter);

    wsServer.on('authUserConnected', ({ socket, uid }) => {
        socket.on('GetMessages', execute.bind(null, wsServer, uid, GetMessages));
        socket.on('GetProfile', execute.bind(null, wsServer, uid, GetProfile));
        socket.on('SearchByLogin', execute.bind(null, wsServer, uid, SearchByLogin));
        socket.on('AddContact', async (userId) => {
            try {
                const result = await AddContact(uid, userId);

                wsServer.emitByUID(uid, 'AddContactResult', {
                    success: true,
                    value: result
                });

                wsServer.emitByUID(uid, 'NewChat', result);
            } catch (error) {
                wsServer.emitByUID(uid, 'AddContactResult', {
                    success: false,
                    error: error.message || error.body
                });
            }
        });
        socket.on('DeleteProfile', execute.bind(null, wsServer, uid, DeleteProfile));
        socket.on('GetChatList', execute.bind(null, wsServer, uid, GetChatList));
        socket.on('SendMessage', async ({ chatId, text }) => {
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
        });
        // socket.on('AskOlesya', async ({ text }) => {
        //     try {
        //         const answer = await olesya.ask(text);

        //         wsServer.emitByUID(uid, 'SendMessageResult', {
        //             success: true,
        //             value: answer
        //         });
        //     } catch (error) {
        //         wsServer.emitByUID(uid, 'SendMessageResult', {
        //             success: false,
        //             error: error.message || error.body
        //         });
        //     }
        // });
    });
};

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

    await message.save();
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
    const foundUsers = [];
    const allUsersIterator = UserIdLoginModel.getIterator();
    let userIdAndLogin = await allUsersIterator.next();
    while (userIdAndLogin) {
        if (userIdAndLogin.login.toLowerCase().indexOf(login.toLowerCase()) !== -1) {
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

async function AddContact(uid, userId) {
    if (uid === userId) {
        throw new Error('You can\'t add yourself!');
    }

    const he = await UserModel.getById(userId);
    const me = await UserModel.getById(uid);

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
