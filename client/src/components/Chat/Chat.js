import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatHistory from './ChatHistory/ChatHistory';
import ChatInput from './ChatInput/ChatInput';
import styles from './Chat.css';
import ChatHistoryServiceMessage from
    '../Chat/ChatHistory/ChatHistoryServiceMessage/ChatHistoryServiceMessage';

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        photoURL: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string,
        transistFromChatToContacts: PropTypes.func.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element
        ])
    }

    render() {

        const chatHistory = this.props.chatHistory.map(message => (
            <ChatHistoryUserMessage id={message.id} avatar={message.body}
                name={message.name} from={message.fromMe}
            />
        ));

        return (
            <div className={styles.Wrapper}>
                <ChatHeader photoURL={this.props.photoURL}
                    name={this.props.name} status={this.props.status}
                    transistFromChatToContacts={ this.props.transistFromChatToContacts } />
                        chatHistory
                <ChatInput />
            </div>
        );
    }
}


