'use strict';

const uuid = require('uuid/v4');

class Message {
    constructor({ MessageModel, body, chat, user }) {
        this.message = new MessageModel({
            id: uuid(),
            sender: user,
            body,
            date: Date.now(),
            chatId: chat.getId()
        });
    }
}

module.exports = Message;
