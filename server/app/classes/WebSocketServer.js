'use strict';

const io = require('socket.io');
const uuid = require('uuid').v4;
const EventEmitter = require('events').EventEmitter;

class WebSocketServer extends EventEmitter {
    constructor(app, sessionGetter) {
        super();

        this._ioServer = io(app);
        this._sessionGetter = sessionGetter;
        this._users = {};

        this._ioServer.on('connect', this._onConnect.bind(this));
    }

    emitByUID(uid, type, value) {
        if (this._users[uid]) {
            for (const socketId in this._users[uid]) {
                if (this._users[uid].hasOwnProperty(socketId)) {
                    this._users[uid][socketId].emit(type, value);
                }
            }
        }
    }

    broadcastEmit(type, value) {
        this._ioServer.emit(type, value);
    }

    async _onConnect(socket) {
        const uid = await this._sessionGetter.get(socket.handshake.query.token);

        if (!uid) {
            return this.emit('notAuthUserConnected', {
                socket
            });
        }

        if (!this._users[uid]) {
            this._users[uid] = {};
        }

        const socketId = uuid();
        this._users[uid][socketId] = socket;

        socket.on('disconnect', this._onDisconnect.bind(this, uid, socketId));

        return this.emit('authUserConnected', {
            socket,
            uid
        });
    }

    _onDisconnect(uid, socketId) {
        delete this._users[uid][socketId];

        if (!Object.keys(this._users[uid]).length) {
            delete this._users[uid];
        }
    }
}

module.exports = WebSocketServer;
