'use strict';

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require('graphql');
const UserModel = require('../../models/User');
const UserType = require('./UserType');

module.exports = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        profile: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                },
                gitHubId: {
                    type: GraphQLID
                }
            },
            resolve: async (_, { id }) => {
                try {
                    return UserModel.getById(id);
                } catch (error) {
                    return error;
                }
            }
        }
    })
});
