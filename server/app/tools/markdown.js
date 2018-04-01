'use strict';

const url = require('url');
const message = require('./currentMessage');

const querystring = require('querystring');
const pagedown = require('pagedown');
const saneConv = pagedown.getSanitizingConverter();
let mes = '**tut** _budet_ message';

exports.markdown = (req, res) => {
    const query = querystring.parse(url.parse(req.url).query);
    message.getMessage(mes);
    const markdown = query.md || message.show();
    res.write('<h1>output:</h1>\n' + saneConv.makeHtml(markdown));
    res.write(
        '<h1>Your message</h1>\n' +
        '<form method="get" action="/">' +
            '<textarea cols=50 rows=10 name="md">' +
                markdown.replace(/</g, '&lt;') +
            '</textarea><br>' +
            '<input type="submit" value="Convert!">' +
        '</form>'
    );

    res.end('</body></html>');
};

