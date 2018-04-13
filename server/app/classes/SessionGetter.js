/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
'use strict';

class SessionGetter {
    constructor(sessionStore) {
        this._sessionStore = sessionStore;
    }

    async get(token) {}
}

module.exports = SessionGetter;
