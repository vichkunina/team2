import React from 'react';
import ReactDOM from 'react-dom';

import Store from './components/Store/Store';
import App from './components/App/App';
import { WorkerWrapper } from './websocket/worker-wrapper';

const worker = new WorkerWrapper('message-worker.js');
const store = new Store();

worker.subscribe('SearchByLogin', (error, result) => {
    console.log('result: ');
    console.log(result);
    console.log(error);
    store.searchResult = result;
});
worker.subscribe('DeleteProfile', (error, result) => {
    console.info(result);
    console.info(error);
});
worker.subscribe('NewMessage', (error, result) => {
    console.info(error);
    if (store.profile.id !== result.from) {
        store.chatHistories
            .find(history => history.chatId === result.chatId)
            .messages.push(result);
    }
    console.log(store.chatHistories);
});
worker.subscribe('SendMessage', (error, result) => {
    console.info('result: ');
    console.info(result);
    console.info(error);
});
worker.subscribe('GetProfile', (error, profile) => {
    console.log('err', error, profile);
    store.profile = profile;
});
worker.subscribe('GetChatList', (error, chats) => {
    chats.forEach(chat => {
        worker.getMessages({
            chatId: chat.id,
            offset: 0,
            limit: 50
        });
    });
    store.chats = store.chats.concat(chats.map(initChat));

    console.log('chats: ', chats);
});

function initChat(chat) {
    const user = chat.users.find(user => user.id !== store.profile.id);
    console.log(chat, store.profile.id);
    chat.avatar = user.avatar;
    chat.name = user.login;

    return chat;
}

worker.subscribe('GetMessages', (error, data) => {
    const chatHistory = store.chatHistories
        .find(history => history.chatId === data.chatId);
    if (chatHistory) {
        chatHistory.messages.push(...data.messages);
    } else {
        store.chatHistories.push({
            chatId: data.chatId,
            messages: data.messages
        });
    }
    console.log('store.chatHistories: ');
    console.log(store.chatHistories);
});
worker.subscribe('AddContact', (err, chat) => {
    store.chats = store.chats.concat([initChat(chat)]);
    store.chatHistories = store.chatHistories.concat([{ chatId: chat.id, messages: [] }]);
});
worker.subscribe('NewChat', (err, chat) => {
    store.chats = store.chats.concat([initChat(chat)]);
    store.chatHistories = store.chatHistories.concat([{ chatId: chat.id, messages: [] }]);
});

ReactDOM.render(<App store={store} worker={worker}/>, document.getElementById('root'));
