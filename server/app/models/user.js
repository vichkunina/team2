const { makeModel } = require('hruhru');
const userScheme = require('../schemes/userScheme');

module.exports = makeModel(userScheme, 'users');