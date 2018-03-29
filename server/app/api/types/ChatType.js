'use strict';

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require('graphql');
const GraphQLDate = require('graphql-date');

const UserType = require('./UserType');

module.exports = new GraphQLObjectType({
    name: 'Chat',
    fields: () => ({
        id: {
            description: 'Chat ID in UUID format',
            type: GraphQLID
        },
        name: {
            description: 'Chat name',
            type: GraphQLString
        },
        users: {
            description: 'List of users in chat',
            type: new GraphQLList(UserType)
            // resolve
        },
        createdAt: {
            description: 'Date of chat\'s creation',
            type: GraphQLDate
        }
    })
});