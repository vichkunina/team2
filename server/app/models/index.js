'use strict';

const UserModel = require('./User');
const ChatModel = require('./Chat');
const GithubModel = require('./Github');
const UserIdLoginModel = require('./UserIdLogin');
const { makeModel } = require('hruhru');
const messageScheme = require('../schemes/messageScheme');

UserModel.makeLink('contacts', UserModel);
UserModel.makeLink('chats', ChatModel);

ChatModel.makeLink('users', UserModel);

GithubModel.makeLink('uid', UserModel);

UserIdLoginModel.makeLink('userId', UserModel);

module.exports = {
    UserModel,
    ChatModel,
    GithubModel,
    UserIdLoginModel,
    messageModelFactory: (chatId) => {
        const messageModel = makeModel(messageScheme, `messages_${chatId}`, true);
        messageModel.makeLink('from', UserModel);

        return messageModel;
    }
};
