import io from 'socket.io-client';
import * as Types from '../enum/WSActionType';

let TOKEN;
let socket;
const methods =
    ['GetMessages', 'GetProfile', 'SearchByLogin', 'AddContact', 'GetChatList',
        'SendMessage', 'DeleteProfile', 'AskOlesya'];

const host = process.env.HOST;
console.info('host: ' + process.env.HOST);

function initSocket() {
    socket = io(host, {
        transports: ['websocket'],
        query: { token: TOKEN }
    });

    socket.on('NewMessage', message => {
        postMessage({ action: 'NewMessage', result: message, type: Types.EMIT });
    });
    socket.on('NewChat', chat => {
        postMessage({ action: 'NewChat', result: chat, type: Types.EMIT });
    });

    for (const method of methods) {
        socket.on(`${method}Result`, result => {
            console.info(result);
            postMessage({ action: method, result, type: Types.RESPONSE });
        });
    }
}

onmessage = e => {
    console.info('Received message from main');
    console.info(e.data);
    const action = e.data.action;
    if (action === 'auth' && !TOKEN) {
        TOKEN = e.data.token;
        initSocket();

        return;
    }
    socket.emit(action, e.data.value);
};
