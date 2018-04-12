const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { createServer } = require('http');

module.exports = function (schema, sessionStore) {
    return new SubscriptionServer({
        schema,
        execute,
        subscribe,
        onConnect: async (sid) => {
            const uid = getUserIDBySID(sessionStore, sid.split(':')[1].split('.')[0]);

            if (uid) {
                console.log(uid);
            } else {

            }
        }

    }, {
        port: 8081
    });
};

function getUserIDBySID(store, id) {
    const session = store.sessions[id];
    if (session) {
        return JSON.parse(session).passport.user;
    }

    return null;
}
