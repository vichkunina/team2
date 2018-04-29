/* eslint-disable no-invalid-this */
import { observable, action } from 'mobx';
import * as States from '../enum/LoadState';

export default class DataStore {

    constructor(rootStore, webWorker) {
        this.webWorker = webWorker;
        this.rootStore = rootStore;
        this.loadProfile();
    }

    @observable loadingState = States.LOADED;

    @observable profile = {};

    @observable chatList = [];

    @observable chatHistories = new Map();

    @action setChatHistory = (chatId, messages) => {
        const chatHistory = this.chatHistories.get(chatId);
        if (chatHistory) {
            chatHistory.push(...messages);
        } else {
            this.chatHistories.set(chatId, messages);
        }
    };

    @action setLoadingState = (state) => {
        this.loadingState = state;
    };

    @action setProfile = (profile) => {
        this.profile = profile;
    };

    @action addChats = (chats) => {
        this.chatList.push(...chats.map(initChat.bind(this)));
        chats.forEach(chat => {
            if (!this.chatHistories.has(chat._id)) {
                this.chatHistories.set(chat._id, []);
            }
        });
    };

    @action addMessage = (message) => {
        this.chatHistories.get(message.chatId).push(message);
    };

    @action addContact = (userId) => {
        this.loadingState = States.ADD_CONTACT;
        this.webWorker.addContact(userId);
    };

    @action sendMessage = (message) => {
        this.webWorker.sendMessage(message);
    };

    @action uploadImages = (images) => {
        this.webWorker.uploadImage(images);
    };

    @action searchByLogin = (userId) => {
        this.loadingState = States.SEARCH_CONTACTS;
        this.webWorker.searchByLogin(userId);
    };

    @action loadChatList = () => {
        this.loadingState = States.LOAD_CONTACTS;
        this.webWorker.getChatList();
    };

    @action loadProfile = () => {
        this.loadingState = States.LOAD_PROFILE;
        this.webWorker.getProfile();
    };

    getLastChatMessage(chat) {
        const chatHistory = this.chatHistories.get(chat._id);

        if (!(chatHistory && chatHistory[chatHistory.length - 1])) {
            return '';
        }

        return chatHistory[chatHistory.length - 1];
    }

}

function initChat(chat) {
    if (!chat) {
        return;
    }
    const user = chat.users.find(entry => entry._id !== this.profile._id);

    chat.avatar = user.avatar;
    chat.name = user.login;

    return chat;
}
