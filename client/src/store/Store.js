/* eslint-disable max-len */
import { observable, computed } from 'mobx';
import * as States from '../enum/LoadState';

export default class Store {

    @observable state = {
        showContacts: true,
        showChat: true,
        showProfile: true
    };

    @observable loadingState = States.LOADED;

    @computed get loaderState() {
        return getLoaderState(this.loadingState);
    }

    @observable profile = {};
    @observable searchResult = [];

    @observable chats = [];

    @observable chatHistories = [];
}

function getLoaderState(loadingState) {
    let state;
    let message = '';

    if (loadingState === States.LOADED) {
        state = false;
    }

    if (loadingState === States.LOAD_CONTACTS) {
        state = true;
        message = 'Loading contacts';
    }

    if (loadingState === States.LOAD_PROFILE) {
        state = true;
        message = 'Loading profile';
    }

    if (loadingState === States.ADD_CONTACT) {
        state = true;
        message = 'Adding contact';
    }

    return { state, message };
}
