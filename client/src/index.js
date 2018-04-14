import React from 'react';
import ReactDOM from 'react-dom';

import Store from './components/Store/Store';
import App from './components/App/App';
import { WorkerWrapper } from './websocket/worker-wrapper';

const worker = new WorkerWrapper('message-worker.js');
worker.subscribe('SendMessage', (error, result) => {
    console.info(result);
    console.info(error);
});
worker.subscribe('GetProfile', (error, profile) => {
    console.info(profile);
    console.info(error);
});
worker.subscribe('GetChatList', (error, chats) => {
    console.info(chats);
    console.info(error);
});
worker.getProfile();
worker.getChatList();
worker.sendMessage({ chatId: 1, text: 'asdasd' });

const store = new Store();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
