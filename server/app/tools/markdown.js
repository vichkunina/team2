'use strict';

const pagedown = require('pagedown');
const saneConv = pagedown.getSanitizingConverter();

exports.markdownIt = (message) => saneConv.makeHtml(message);

