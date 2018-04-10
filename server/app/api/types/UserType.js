'use strict';

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require('graphql');
const GraphQLDate = require('graphql-date');
const ChatType = require('./ChatType');

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
            resolve: async (user, _, req) => {
                if (user.id !== req.user.id) {
                    return [];
                }

                try {
                    return user.getByLink('contacts');
                } catch (error) {
                    return error;
                }
            }
        },
        chats: {
            description: 'List of user\'s chats',
            type: new GraphQLList(ChatType),
            resolve: async (user, _, req) => {
                if (user.id !== req.user.id) {
                    return [];
                }

                try {
                    return user.getByLink('chats');
                } catch (error) {
                    return error;
                }
            }
        },
        createdAt: {
            description: 'Date of user\'s registration',
            type: GraphQLDate
        }
    })
});

module.exports = UserType;
