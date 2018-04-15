'use strict';

const ogs = require('open-graph-scraper');

exports.openGraph = async (url) => {
    const options = { 'url': url, 'timeout': 10000 };

    return ogs(options);
};
