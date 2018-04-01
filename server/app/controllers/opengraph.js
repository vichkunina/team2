'use strict';

const ogs = require('open-graph-scraper');

exports.openGraph = (req, res) => {
    const url = req.query.url;
    const options = { 'url': url, 'timeout': 10000 };
    ogs(options)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error));
};
