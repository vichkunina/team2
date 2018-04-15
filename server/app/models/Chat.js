'use strict';

const { makeModel } = require('hruhru');
const chatScheme = require('../schemes/chatScheme');

const chatBaseModel = makeModel(chatScheme, 'chats');

chatBaseModel.prototype.addUser = async function (user) {
    await this.atomPush('users', user.id);
    await user.atomPush('chats', this.id);
};

module.exports = chatBaseModel;
