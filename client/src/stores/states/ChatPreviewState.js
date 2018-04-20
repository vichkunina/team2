/* eslint-disable no-invalid-this */
import { observable, action } from 'mobx';

export default class ChatPreviewState {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    @observable attachments = [];

    @observable uploadQueue = [];

    @action change = (files) => {
        Object.values(files).forEach(file => this.uploadQueue.push(file));
        console.log('this.uploadQueue', this.uploadQueue);
        this.upload();
    };

    @action upload = () => {
        if (this.uploadQueue.length > 0) {
            this.dataStore.uploadImage(this.uploadQueue[0]);
            this.uploadQueue.splice(0, 1);
        }
    };

    @action addAttachment = (attachment) => {
        this.attachments.push(attachment);
        this.upload();
    };

    @action remove = (index) => {
        this.attachments.splice(index, 1);
    };
}
