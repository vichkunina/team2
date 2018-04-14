import io from 'socket.io-client';

let TOKEN;
let socket;
const methods =
    ['GetMessages', 'GetProfile', 'SearchByLogin', 'AddContact', 'GetChatList',
        'SendMessage', 'DeleteProfile'];

function initSocket() {
    socket = io('http://localhost:8080', {
        transports: ['websocket'],
        query: { token: TOKEN }
    });

    socket.on('NewMessage', message => {
        postMessage({ action: 'NewMessage', message });
    });
    socket.on('NewChat', chat => {
        postMessage({ action: 'NewChat', chat });
    });

    for (const method of methods) {
        socket.on(`${method}Result`, result => {
            console.info(result);
            postMessage({ action: method, result });
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
