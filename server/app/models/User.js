'use strict';

const { makeModel } = require('hruhru');
const userScheme = require('../schemes/userScheme');

const userBaseModel = makeModel(userScheme, 'users');

userBaseModel.prototype.addContact = async function (user) {
    this.contacts.push(user.id);
    user.contacts.push(this.id);

    await this.save();
    await user.save();
};

module.exports = userBaseModel;
