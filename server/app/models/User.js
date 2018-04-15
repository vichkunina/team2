'use strict';

const { makeModel } = require('hruhru');
const userScheme = require('../schemes/userScheme');

const userBaseModel = makeModel(userScheme, 'users');

userBaseModel.prototype.addContact = async function (user) {
    await this.atomPush('contacts', user.id);
    await this.atomPush('contacts', this.id);
};

module.exports = userBaseModel;
