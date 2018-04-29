/* eslint-disable no-invalid-this */
import { observable, action } from 'mobx';

export default class ChatPreviewState {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    @observable chatAttachments = [];

    @action change = (files) => {
        this.dataStore.uploadImages(files);
        Object.values(files).forEach(file => this.chatAttachments.push(file));
    };

    @action remove = (index) => {
        this.chatAttachments.splice(index, 1);
    }

    @action addAttachments = (urls) => {
        this.chatAttachments.push(...urls);
    }
}