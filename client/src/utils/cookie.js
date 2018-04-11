'use strict';

module.exports.getCookie = function (name) {
    const cookiesObj = document
        .cookie.split(';')
        .map(str => str.trim())
        .reduce((obj, next) => {
            const [name, value] = next.split('=');
            obj[name] = value;

            return obj
        }, {});

    return decodeURIComponent(cookiesObj[name]);
};