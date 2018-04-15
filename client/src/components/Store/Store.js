import { observable, action } from 'mobx';
import * as States from '../../enum/LoadState';

export default class Store {

    @observable state = {
        showContacts: true,
        showChat: true,
        showProfile: true
    };

    @observable loadingState = States.LOADED;

    @observable profile = {};
    @observable searchResult = [];

    @observable chats = [];

    @observable chatHistories = [];

    @observable currentChat = {};

    @action addMessage(chatId, message) {
        this.chatHistories.find(history => history.chatId === chatId).messages.push(message);
    }

}
