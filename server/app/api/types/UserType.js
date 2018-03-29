'use strict';

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require('graphql');
const GraphQLDate = require('graphql-date');
const ChatType = require('./ChatType');
const UserModel = require('../../models/User');

UserModel.makeLink('contacts', UserModel);

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            description: 'User ID in UUID format',
            type: GraphQLID
        },
        login: {
            description: 'User login',
            type: GraphQLString
        },
        name: {
            description: 'User name',
            type: GraphQLString
        },
        githubID: {
            description: 'ID of user\'s GitHub account',
            type: GraphQLID
        },
        contacts: {
            description: 'Contact list of user',
            type: new GraphQLList(UserType),
            resolve: async (user) => {
                try {
                    const model = await UserModel.getById(user.id);

                    return model.getByLink('contacts');
                } catch (error) {
                    console.log(error);
                }
            }
        },
        /*chats: {
            description: 'List of user\'s chats',
            type: new GraphQLList(ChatType)
            // resolve
        },*/
        createdAt: {
            description: 'Date of user\'s registration',
            type: GraphQLDate
        }
    })
});

module.exports = UserType;
