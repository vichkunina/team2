'use strict';

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const MessageType = require('./MessageType');
const ChatType = require('./ChatType');
const {
    UserModel,
    ChatModel,
    messageModelFactory
} = require('../../models');

module.exports = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addContact: {
            type: ChatType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: async (_, { id }, req) => {
                const user = await UserModel.getById(id);
                await req.user.addContact(user);

                const chat = new ChatModel({
                    dialog: true
                });
                await chat.save();

                await chat.addUser(user);
                await chat.addUser(req.user);

                return chat;
            }
        },
        createChat: {
            type: ChatType,
            args: {
                name: {
                    type: GraphQLString
                },
                users: {
                    type: new GraphQLList(GraphQLID)
                }
            },
            resolve: async (_, { name, users }, req) => {
                const chat = new ChatModel({
                    name: name,
                    users: [req.user.id]
                });
                await chat.save();

                for (let userId of users) {
                    try {
                        const user = await UserModel.getById(userId);
                        await chat.addUser(user);
                    } catch (error) {
                        console.error(error);
                    }
                }

                return chat;
            }
        },
        sendMessage: {
            type: MessageType,
            args: {
                chatId: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                text: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (_, { chatId, text }, req) => {
                const MessageModel = messageModelFactory(chatId);
                const message = new MessageModel({
                    from: req.user.id,
                    body: text
                });

                await message.save();

                return message;
            }
        }
    })
});
