'use strict';
const { makeModel } = require('hruhru');
const githubScheme = require('../schemes/githubScheme');

module.exports = makeModel(githubScheme, 'github');
