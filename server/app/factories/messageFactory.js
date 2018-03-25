const { makeModel } = require('hruhru');
const messageScheme = require('../schemes/messageScheme');

module.MessageFactory = (chatId) => makeModel(messageScheme, `${chatId}_messages`);