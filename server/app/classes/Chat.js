'use strict';

const uuid = require('uuid/v4');
const ChatModel = require('../models/chatModel');
const { UserModel } = require('User');

ChatModel.makeLink('users', UserModel);

class Chat {
    constructor({ name, users }) {
        this._chatModel = new ChatModel({
            name,
            users,
            date: Date.now(),
            id: uuid()
        });
        this._chatModel.save();
    }

    getId() {
        return this._chatModel.id;
    }
}

module.exports = { Chat, ChatModel };
