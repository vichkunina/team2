const { makeModel } = require('hruhru');
const chatScheme = require('../schemes/chatScheme');

module.exports = makeModel(chatScheme, 'chats');