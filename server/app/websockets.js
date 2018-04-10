const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

module.exports = function(schema, webSocketServer) {
    return new SubscriptionServer({
        execute,
        subscribe,
        schema,
        onConnect: (params, socket) => {
            console.log(socket.handshake)
        }

    }, {
        server: webSocketServer
    })
};
