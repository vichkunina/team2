'use strict';
/* eslint-disable no-shadow*/

const message = require('./currentMessage');
let mes = '**tut** _budet_ message https://github.com/urfu-2017 http://mail.ru/ fdddddd';
message.getMessage(mes);
let currentMessage = message.show();
let hrefArray = [];

const findHref = (currentMessage) => {
    let linkData = currentMessage.match(/(http|https|ftp):\/\/[^\s]+/i);
    if (!linkData) {

        return 0;
    }

    const link = linkData[0];
    const index = linkData.index;

    return { link, index };
};

const getHrefArray = (currentMessage) => {
    let link = findHref(currentMessage);
    if (link.link && link.index + link.link.length - 1 < currentMessage.length) {
        hrefArray.push(link.link);
        let currentMessageSlice = currentMessage.slice(link.index + link.link.length);
        getHrefArray(currentMessageSlice);
    }
};

getHrefArray(currentMessage);
exports.getHrefArray = getHrefArray;


