'use strict';

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');

const ChatType = new GraphQLObjectType({
    name: 'Chat',
    fields: () => ({
        id: {
            description: 'Chat ID in UUID format',
            type: GraphQLID
        },
        name: {
            description: 'Chat name',
            type: GraphQLString,
            resolve: async (chat, req) => {
                if (chat.dialog) {
                    const user = (await chat.getByLink('users'))
                        .filter(u => u.id !== req.user.id)[0];

                    return user.name;
                }

                return chat.name;
            }
        },
        dialog: {
            description: 'Chat or dialog',
            type: GraphQLBoolean
        },
        users: {
            description: 'List of users in chat',
            type: new GraphQLList(require('./UserType')),
            resolve: async (chat) => {
                return await chat.getByLink('users');
            }
        }
    })
});

module.exports = ChatType;