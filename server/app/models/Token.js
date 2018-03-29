'use strict';

const { makeModel } = require('hruhru');
const tokenScheme = require('../schemes/tokenScheme');

module.exports = makeModel(tokenScheme, 'tokens', true);
