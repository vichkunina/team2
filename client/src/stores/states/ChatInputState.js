/* eslint-disable no-invalid-this */
import { observable, action } from 'mobx';

export default class ChatInputState {

    constructor(state, dataStore) {
        this.state = state;
        this.dataStore = dataStore;
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
            text: this.chatInput
        });
        this.chatInput = '';
    };
}
