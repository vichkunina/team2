/* eslint-disable no-console */
import DataStore from './DataStore';
import UIStore from './UIStore';
import * as States from '../enum/LoadState';

export default class RootStore {
    constructor(webWorker) {
        this.dataStore = new DataStore(this, webWorker);
        this.state = new UIStore(this, webWorker);
        initWorker(webWorker, this.dataStore, this.state);
    }
}

function initWorker(webWorker, dataStore, state) {
    webWorker.subscribe('SearchByLogin', (error, result) => {
        if (error) {
            console.info(error);

            return;
        }

        dataStore.setLoadingState(States.LOADED);
        state.setSearchResults(result);
    });

    webWorker.subscribe('DeleteProfile', (error) => {
        if (error) {
            console.info(error);
        }
    });

    webWorker.subscribe('SendMessage', (error, result) => {
        dataStore.messageDidSent(result);
        if (error) {
            console.info(error);
        }
    });

    webWorker.subscribe('GetProfile', (error, profile) => {
        if (error) {
            console.info(error);

            return;
        }

        dataStore.setProfile(profile);
        dataStore.loadChatList();
    });

    webWorker.subscribe('UploadImage', (error, result) => {
        if (error) {
            console.info(error);
        }

        state.addAttachment(result);
    });

    webWorker.subscribe('NewMessage', (error, result) => {
        if (error) {
            console.info(error);

            return;
        }

        dataStore.addMessage(result);
    });

    webWorker.subscribe('GetChatList', (error, chats) => {
        if (error) {
            console.info('error: ', error);

            return;
        }

        chats.forEach(chat => {
            webWorker.getMessages({
                chatId: chat._id,
                offset: 0,
                limit: 50
            });
        });
        dataStore.addChats(chats);
        dataStore.setLoadingState(States.LOADED);
        dataStore.restoreMessagesForSend();
    });

    webWorker.subscribe('GetMessages', (error, data) => {
        if (!data || error) {
            console.info('error: ', error);

            return;
        }

        dataStore.setChatHistory(data.chatId, data.messages);
    });

    webWorker.subscribe('AddContact', (error, chat) => {
        if (error) {
            console.info('error: ', error);

            return;
        }

        dataStore.setLoadingState(States.LOADED);
        dataStore.addChats([chat]);
    });

    webWorker.subscribe('NewChat', (error, chat) => {
        if (error) {
            console.info('error: ', error);

            return;
        }

        dataStore.setLoadingState(States.LOADED);
        dataStore.addChats([chat]);
    });
}
