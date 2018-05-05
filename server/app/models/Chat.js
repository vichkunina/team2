'use strict';

const mongoose = require('mongoose');
const randomstring = require('randomstring');

const chatSchema = new mongoose.Schema({
    avatar: String,
    name: String,
    dialog: Boolean,
    users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    inviteLink: { type: String, index: true }
});

chatSchema.methods.addUser = function (personId) {
    personId = mongoose.Types.ObjectId(personId);
    if (this.users.find(userId => userId.equals(personId))) {
        return;
    }
    this.users.push(personId);

    return this.save();
};

chatSchema.methods.generateInviteLink = function () {
    this.inviteLink = randomstring.generate();

    return this.save();
};

chatSchema.methods.containsUser = function (userName) {
    return this.users.indexOf(mongoose.Types.ObjectId(userName)) !== -1;
};

module.exports = mongoose.model('Chat', chatSchema);
