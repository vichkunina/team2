import React from 'react';
import { PropTypes } from 'mobx-react';
import styles from './ChatInput.css';
import ReactPropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { observer } from 'mobx-react';

@observer
export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chatInput: '' };
    }

    static propTypes = {
        chatHistories: PropTypes.observableArrayOf(PropTypes.observableObject),
        addMessage: ReactPropTypes.func,
        chatId: ReactPropTypes.string,
        profile: PropTypes.observableObject
    };

    submitHandler(event) {
        console.log('this.props.currentChatHistory: ');
        console.log(this.props.chatHistories
            .find(history => history.chatId === this.props.chatId));
        const message = {
            from: this.props.profile.id,
            body: this.state.chatInput,
            id: uuid(),
            createdAt: Date.now(),
            editedAt: Date.now()
        };
        console.log(this.props.chatHistories);
        this.props.chatHistories
            .find(history => history.chatId === this.props.chatId)
            .messages.push(message);
        this.props.sendMessage({
            chatId: this.props.chatId,
            text: message.body
        });
        event.preventDefault();
        this.setState({ chatInput: '' });
    }

    textChangeHandler(event) {
        this.setState({ chatInput: event.target.value });
    }

    render() {
        return (
            <form className={styles.Wrapper} onSubmit={this.submitHandler.bind(this)}>
                <input type="text" className={styles.Input}
                    value={this.state.chatInput}
                    placeholder="Write a message..."
                    onChange={this.textChangeHandler.bind(this)}
                />
                <input type="submit" value="Send" className={styles.Send}/>
            </form>
        );
    }
}
