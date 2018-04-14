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
worker.subscribe('AddContact', (error, contact) => {
    console.info(contact);
    console.info('ac', error);
});
// worker.getProfile();
worker.getChatList();
//worker.addContact('dced0fed-96fb-4c77-bfd4-83f9955606a7');

const store = new Store();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
