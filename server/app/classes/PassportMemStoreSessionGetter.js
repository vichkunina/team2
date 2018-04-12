'use strict';

const SessionGetter = require('./SessionGetter');

class PassportMemStoreSessionGetter extends SessionGetter {
    constructor(store) {
        super(store);
    }

    async get(token) {
        const session = this._sessionStore.sessions[token];

        if (session) {
            return JSON.parse(session).passport.user;
        }

        return null;
    }
}

module.exports = PassportMemStoreSessionGetter;