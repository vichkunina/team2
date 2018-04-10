'use strict';

const { makeModel } = require('hruhru');
const userScheme = require('../schemes/userScheme');

const userBaseModel = makeModel(userScheme, 'users');

module.exports = class extends userBaseModel {
    constructor(obj = {}) {
        super(obj);
    }

    async addContact(user) {
        this.contacts.push(user.id);
        user.contacts.push(this.id);

        await this.save();
        await user.save();
    }
};
