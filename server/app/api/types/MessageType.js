'use strict';

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');
const UserType = require('./UserType');

module.exports = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: {
            description: 'Message ID in UUID format',
            type: GraphQLID
        },
        body: {
            description: 'Message text',
            type: GraphQLString
        },
        from: {
            description: 'Message sender',
            type: UserType,
            resolve: async (message) => {
                return await message.getByLink('from');
            }
        },
        createdAt: {
            description: 'Date of message creation',
            type: GraphQLDate
        }
    })
});
