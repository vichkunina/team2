'use strict';

const UserModel = require('./User');
const ChatModel = require('./Chat');
const GithubModel = require('./Github');
const { makeModel } = require('hruhru');
const messageScheme = require('../schemes/messageScheme');

UserModel.makeLink('contacts', UserModel);
UserModel.makeLink('chats', ChatModel);

ChatModel.makeLink('users', UserModel);

GithubModel.makeLink('uid', UserModel);

module.exports = {
    UserModel,
    ChatModel,
    GithubModel,
    messageModelFactory: (chatId) => {
        const messageModel = makeModel(messageScheme, `messages_${chatId}`, true);
        messageModel.makeLink('from', UserModel);

        return messageModel;
    }
};
