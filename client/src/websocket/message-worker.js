import io from 'socket.io-client';
import ss from 'socket.io-stream';
import * as Types from '../enum/WSActionType';


const METHODS =
    ['GetMessages', 'GetProfile', 'SearchByLogin', 'AddContact', 'GetChatList',
        'SendMessage', 'DeleteProfile'];

let TOKEN;
let socket;

function init() {
    socket = io(process.env.HOST, {
        transports: ['websocket'],
        query: { token: TOKEN }
    });

    socket.on('NewMessage', message => {
        postMessage({ action: 'NewMessage', result: message, type: Types.EMIT });
    });
    socket.on('NewChat', chat => {
        postMessage({ action: 'NewChat', result: chat, type: Types.EMIT });
    });

    for (const method of METHODS) {
        socket.on(`${method}Result`, result => {
            postMessage({ action: method, result, type: Types.RESPONSE });
        });
    }
}

onmessage = e => {
    const action = e.data.action;
    if (action === 'auth' && !TOKEN) {
        TOKEN = e.data.token;
        init();

        return;
    }

    if (action === 'UploadImages') {
        Object.values(e.data.value).forEach(file => {
            const stream = ss.createStream();
            ss(socket).emit('upload-file', stream, { name: file.name }, file);
            ss.createBlobReadStream(file).pipe(stream);
        });

        return;
    }

    socket.emit(action, e.data.value);
};
