'use strict';

let currentMessage = '';
const getMessage = (mes) => {
    currentMessage = mes;

    return currentMessage;
};

exports.show = () => currentMessage;
exports.getMessage = getMessage;
