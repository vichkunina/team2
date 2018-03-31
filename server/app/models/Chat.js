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
        user.chats.push(this.id);

        await this.save();
        await user.save();
    }
};
