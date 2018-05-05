'use strict';

const config = require('config');
const { ChatModel } = require('../models');
const { emitNewChatUser } = require('../websockets');

module.exports = app => {
// Маршрут для входа в чат
    app.get(
        '/join/:chatLink',
        async (req, res) => {
            if (!req.isAuthenticated()) {
                res.redirect(`${config.get('host')}/login`);

                return;
            }

            const user = req.user;
            let chat = await ChatModel
                .findOne({ inviteLink: req.params.chatLink });
            if (!req.params.chatLink || !chat) {
                res.sendStatus(404);

                return;
            }

            await join(user, chat);

            res.redirect(config.get('clientHost'));
        }
    );

    async function join(user, chat) {
        if (chat.containsUser(user._id)) {
            return;
        }
        await chat.addUser(user._id);
        chat = await ChatModel.findById(chat._id)
            .populate('users')
            .exec();
        chat.name = chat.users.map(chatUser => chatUser.login).join(', ');
        await chat.save();
        await user.addChat(chat._id);
        await emitNewChatUser(chat, user._id);
    }
};
