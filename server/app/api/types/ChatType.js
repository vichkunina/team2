'use strict';

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');

const { messageModelFactory } = require('../../models/index');

const ChatType = new GraphQLObjectType({
    name: 'Chat',
    fields: () => ({
        id: {
            description: 'Chat ID in UUID format',
            type: GraphQLID
        },
        avatar: {
            description: 'Chat avatar',
            type: GraphQLString,
            resolve: async (chat, _, req) => {
                if (chat.dialog) {
                    const user = (await chat.getByLink('users'))
                      .filter(u => u.id !== req.user.id)[0];

                    return user.avatar;
                }

                return chat.avatar;
            }
        },
        name: {
            description: 'Chat name',
            type: GraphQLString,
            resolve: async (chat, _, req) => {
                if (chat.dialog) {
                    const user = (await chat.getByLink('users'))
                      .filter(u => u.id !== req.user.id)[0];

                    // return user.name;
                    return user.login;
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
        ,
        lastMessage: {
            description: 'Last message in chat',
            type: require('./MessageType'),
            resolve: async (chat) => {
                const MessageModel = messageModelFactory(chat.id);

                const message = await MessageModel.getList({
                    limit: 1,
                    sort: 'date'
                });

                console.log(message);
                return message[0];
            }
        }
    })
});

module.exports = ChatType;
