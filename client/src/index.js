import React from 'react';
import ReactDOM from 'react-dom';

import Store from './components/Store/Store';
import App from './components/App/App';
import { WorkerWrapper } from './websocket/worker-wrapper';

const worker = new WorkerWrapper('message-worker.js');

// worker.getProfile();
// worker.getChatList();
// worker.getMessages({
//     chatId: 'd1c286fe-9fe0-42ca-93b2-65136a64a2f7',
//     offset: 0,
//     limit: 10
// });
// worker.sendMessage({
//     chatId: 'e63e2bb8-8a12-4a91-b183-bacb7020f4b7',
//     text: 'can i habe piza pliaze'
// });

const store = new Store();

ReactDOM.render(<App store={store} worker={worker}/>, document.getElementById('root'));
