'use strict';

const pagedown = require('pagedown');
const saneConv = pagedown.getSanitizingConverter();

const markdownIt = (message) => saneConv.makeHtml(message);
exports.markdownIt = markdownIt;

