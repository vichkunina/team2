'use strict';

const uuid = require('uuid/v4');
const UserModel = require('../models/userModel');
const { ChatModel } = require('Chat');

UserModel.makeLink('chats', ChatModel);

class User {
    constructor({ login, name, githubId }) {
        this._userModel = new UserModel({
            id: uuid(),
            name,
            login,
            githubId,
            chats: [],
            date: Date.now()
        }
        );
        this._userModel.save();
    }
}

module.exports = { User, UserModel };
