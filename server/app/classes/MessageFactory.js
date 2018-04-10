'use strict';

const makeMessageModel = require('../factories/messageFactory');
const MessageClass = require('Message');
const { UserModel } = require('User');

class MessageFactory {
    constructor(chat) {
        this.messageModel = makeMessageModel(chat.getId());
        this.messageModel.makeLink('sender', UserModel);

        this.chat = chat;
    }

    makeMessage({ user, body }) {
        return new MessageClass({
            MessageModel: this.messageModel,
            user,
            body,
            chat: this.chat
        });
    }
}

module.exports = MessageFactory;
