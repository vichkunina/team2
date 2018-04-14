import Worker from './message-worker.js';
import { getCookie } from '../utils/cookie';

export class WorkerWrapper {
    constructor(filename) {
        this._worker = new Worker(filename);
        this._worker.onmessage = e => this._handleResponse(e.data);
        this._worker.postMessage({
            action: 'auth',
            token: getCookie('connect.sid').split(':')[1].split('.')[0]
        });
        this._handlers = {};
    }

    getMessages({ chatId, offset, limit }) {
        this._worker.postMessage({ action: 'GetMessages', value: { chatId, offset, limit } });
    }

    getProfile() {
        this._worker.postMessage({ action: 'GetProfile' });
    }

    getChatList() {
        this._worker.postMessage({ action: 'GetChatList' });
    }

    addContact(userId) {
        this._worker.postMessage({ action: 'AddContact', value: userId });
    }

    sendMessage({ chatId, text }) {
        this._worker.postMessage({ action: 'SendMessage', value: { chatId, text } });
    }

    deleteProfile(userId) {
        this._worker.postMessage({ action: 'DeleteProfile', value: { userId } });
    }

    searchByLogin(login) {
        this._worker.postMessage({ action: 'SearchByLogin', value: { login } });
    }

    _handleResponse(response) {
        const handlers = this._handlers[response.action];
        if (response.result.success === false) {
            handlers.forEach(handler => handler(response.result.error, null));

            return;
        }
        handlers.forEach(handler => handler(null, response.result.value));
    }

    subscribe(event, cb) {
        if (!this._handlers[event]) {
            this._handlers[event] = [];
        }
        this._handlers[event].push(cb);

        return () => {
            this._handlers[event] = this._handlers[event].filter(handler => cb !== handler);
        };
    }
}
