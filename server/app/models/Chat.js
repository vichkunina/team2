'use strict';

const { makeModel } = require('hruhru');
const chatScheme = require('../schemes/chatScheme');

const chatBaseModel = makeModel(chatScheme, 'chats');

module.exports = class extends chatBaseModel {
    constructor(obj = {}) {
        super(obj);
    }

    async addUser(user) {

        this.users.push(user.id);

        user.chats = user.chats ? user.chats : [];
        user.chats.push(this.id);

        console.log(`add chat: ${this.id} to user ${user.login}`);

        await this.save();
        await user.save();
    }
};
