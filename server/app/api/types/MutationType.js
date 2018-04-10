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
const AvatarGenerator = require('../../avatarGenerator/githubAvatar');
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
                const userToAddTo = await UserModel.getById(req.user.id);
                const user = await UserModel.getById(id);

                userToAddTo.contacts.push(user.id);
                await userToAddTo.save();

                const chat = new ChatModel({
                    avatar: new AvatarGenerator(req.user.id).toImgSrc(),
                    name: user.login,
                    dialog: true
                });
                await chat.save();

                await chat.addUser(user);
                await chat.addUser(userToAddTo);

                return chat;
            }
        },
        deleteChat: {
            type: GraphQLString,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: async (_, { id }) => {
                await ChatModel.removeById(id);

                return id;
            }
        },
        deleteProfile: {
            type: GraphQLString,
            args: {
                id: {
                    type: GraphQLID
                }
            },

            resolve: async (_, { id }) => {
                await UserModel.removeById(id);

                return id;
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
                    // avatar:
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
