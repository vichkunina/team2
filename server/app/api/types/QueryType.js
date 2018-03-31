'use strict';

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = require('graphql');
const UserType = require('./UserType');
const MessageType = require('./MessageType');
const {
    UserModel,
    ChatModel,
    messageModelFactory
} = require('../../models');

module.exports = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        profile: {
            type: UserType,
            resolve: async (_, args, req) => {
                try {
                    return UserModel.getById(req.user.id);
                } catch (error) {
                    throw error;
                }
            }
        },
        getLastMessages: {
            type: new GraphQLList(MessageType),
            args: {
                chatId: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                count: {
                    type: GraphQLInt
                }
            },
            resolve: async (_, { chatId, count }, req) => {
                const chat = await ChatModel.getById(chatId);

                if (!chat.users.some(id => id === req.user.id)) {
                    return [];
                }

                const MessageModel = messageModelFactory(chatId);

                return await MessageModel.getList({
                    limit: count
                });
            }
        }
    })
});
