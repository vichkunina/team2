'use strict';

const { makeModel } = require('hruhru');
const messageScheme = require('../schemes/messageScheme');

module.exports = makeModel(messageScheme, 'chats');
