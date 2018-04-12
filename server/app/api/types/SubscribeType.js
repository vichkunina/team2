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
const { withFilter } = require('graphql-subscriptions');
const pubSub = require('../subscribtions');

module.exports = new GraphQLObjectType({
    name: 'Subscription',
    fields: () => ({
        newMessage: {
            type: MessageType,
            subscribe: withFilter(
                () => pubSub.asyncIterator('newMessage'),
                (...args) => {
                    console.log(args);
                }
            )
        }
    })
});
