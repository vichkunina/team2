import { observable, action } from 'mobx';

export default class Store {

    @observable state = {
        showContacts: true,
        showChat: true,
        showProfile: true
    };

    @observable profile = {};
    @observable searchResult = [];

    @observable chats = [];

    @observable chatHistories = [];

    @observable currentChat = {};

    @action addMessage(chatId, message) {
        this.chatHistories.find(history => history.chatId === chatId).messages.push(message);
    }

}
