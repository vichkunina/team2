'use strict';

const { connect, setTimeout } = require('hruhru');
const { ChatModel, UserModel } = require('../models');

connect(process.env.DB_URL, process.env.DB_TOKEN);
setTimeout(2 * 1000);

async function deleteUsers(usersId) {
    for (const userId of usersId) {
        const user = await UserModel.getById(userId);
        const chatsId = await user.getByLink('chats');
        for (const chatId of chatsId) {
            await ChatModel.removeById(chatId);
        }
        await user.remove();
    }
}
deleteUsers(['dced0fed-96fb-4c77-bfd4-83f9955606a7'])
    .then((data) => {
        console.log(data);
    });