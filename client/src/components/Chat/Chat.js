import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { PropTypes } from 'mobx-react';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatHistory from './ChatHistory/ChatHistory';
import ChatInput from './ChatInput/ChatInput';
import styles from './Chat.css';
import ChatHistoryUserMessage from './ChatHistory/ChatHistoryUserMessage/ChatHistoryUserMessage';

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        currentChat: ReactPropTypes.shape({
            chatHistory: PropTypes.observableArray,
            avatar: ReactPropTypes.string,
            name: ReactPropTypes.string
        }),
        transitFromChatToContacts: ReactPropTypes.func.isRequired
    };

    render() {
        const chatHistory = this.props.currentChat.chatHistory.map(message => (
            <ChatHistoryUserMessage key={message.id} fromMe={message.fromMe} name={message.name}
                body={message.body} date={message.date || new Date()}/>
        )
        );

        return (
            <div className={styles.Wrapper}>
                <ChatHeader photoURL={this.props.currentChat.avatar}
                    name={this.props.currentChat.name} status={'online'}
                    transitFromChatToContacts={this.props.transitFromChatToContacts}/>
                <ChatHistory>
                    {chatHistory}
                </ChatHistory>
                <ChatInput/>
            </div>
        );
    }
}


