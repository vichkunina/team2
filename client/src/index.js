/* eslint-disable  no-console*/
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
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


ReactDOM.render(<App/>, document.getElementById('root'));
