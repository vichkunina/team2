'use strict';

const ogs = require('open-graph-scraper');

function getOpenGraphInfo(url) {
    const options = { url };
    ogs(options, function (error, results) {
        // console.info('error:', error);
        // console.info('results:', results);

        return { error, results };
    });
}

// getOpenGraphInfo('http://ogp.me/');

module.exports = getOpenGraphInfo;
