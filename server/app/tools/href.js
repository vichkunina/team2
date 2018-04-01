'use strict';
/* eslint-disable no-useless-escape */
const findHref = (currentMessage) => {
    let linkData =
    currentMessage.match(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})\/([\w\.-]*)/);
    if (!linkData) {

        return 0;
    }

    const link = linkData[0];
<<<<<<< HEAD

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

=======
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
>>>>>>> fix
exports.getHrefArray = getHrefArray;


