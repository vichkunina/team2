/* eslint-disable no-invalid-this */
import { observable, action } from 'mobx';

export default class ChatInputState {

    constructor(state, dataStore, chatPreviewState) {
        this.state = state;
        this.dataStore = dataStore;
        this.chatPreviewState = chatPreviewState;
    }

    @observable chatInput = '';

    @action change = (inputText) => {
        this.chatInput = inputText;
    };

    @action submit = () => {
        if (!this.chatInput) {
            return;
        }
        this.dataStore.sendMessage({
            chatId: this.state.chatState.currentChat._id,
            text: this.chatInput,
            attachments: this.chatPreviewState.chatAttachments
        });

        this.chatInput = '';
        this.chatPreviewState.chatAttachments = [];
    };
}
