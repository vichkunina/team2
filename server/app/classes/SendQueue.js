'use strict';

const { queue } = require('async');

class SendQueue {
    constructor() {
        this._queues = {};

        setInterval(() => {
            for (const chatId in this._queues) {
                if (this._queues[chatId] && !this._queues[chatId].length) {
                    delete this._queues[chatId];
                }
            }
        }, 300 * 1000);
    }

    push(chatId, message) {
        if (!this._queues[chatId]) {
            this._queues[chatId] = queue(this._task.bind(null, chatId));
        }

        this._queues[chatId].push(message);
    }

    async _task(chatId, message, callback) {
        await message.save();

        callback();
    }
}

module.exports = SendQueue;