/* eslint-disable  no-console*/
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
<<<<<<< HEAD
// import { getCookie } from './utils/cookie';
// import io from 'socket.io-client';

// const s = io('http://localhost:8080', {
//     transports: ['websocket'],
//     query: { token: getCookie('connect.sid').split(':')[1].split('.')[0] }
// });
// s.on('GetProfileResult', (data) => {
//     console.log(data);
// });
// s.emit('GetProfile');
=======
import Store from './components/Store/Store';

// import { getCookie } from './utils/cookie';
// import io from 'socket.io-client';
>>>>>>> 01eb8bd54a2105d0a54b252cf30144a4b0c0b7bc

// const s = io('http://localhost:8080', {
//     transports: ['websocket'],
//     query: { token: getCookie('connect.sid').split(':')[1].split('.')[0] }
// });
// s.on('GetProfileResult', (data) => {
//     /* eslint-disable no-console */
//     console.log(data);
// });
// s.emit('GetProfile');
const store = new Store();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
