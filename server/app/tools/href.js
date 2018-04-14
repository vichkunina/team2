'use strict';
/* eslint-disable no-useless-escape */
const findHref = (currentMessage) => {
    let linkData =
    currentMessage.match(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})\/([\w\.-]*)/);
    if (!linkData) {

        return 0;
    }

    const link = linkData[0];

    return { link };
};

const getHrefArray = (currentMessage, hrefArray) => {
    hrefArray = hrefArray || [];
    let link = findHref(currentMessage);
    if (link.link) {
        hrefArray.push(link.link);
        let current = currentMessage.split(link.link).join('');
        getHrefArray(current, hrefArray);
    }

    return hrefArray;
};

exports.getHrefArray = getHrefArray;

