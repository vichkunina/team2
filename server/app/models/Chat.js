'use strict';

const { makeModel } = require('hruhru');
const chatScheme = require('../schemes/chatScheme');

const chatBaseModel = makeModel(chatScheme, 'chats');

chatBaseModel.prototype.addUser = async function (user) {
    this.users.push(user.id);

    user.chats = user.chats ? user.chats : [];
    user.chats.push(this.id);

    await this.save();
    await user.save();
};

module.exports = chatBaseModel;
