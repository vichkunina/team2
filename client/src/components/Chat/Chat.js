/* eslint-disable max-len */
import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { PropTypes } from 'mobx-react';
import { observer } from 'mobx-react';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatHistory from './ChatHistory/ChatHistory';
import ChatInput from './ChatInput/ChatInput';
import styles from './Chat.css';
import ChatHistoryUserMessage from
    './ChatHistory/ChatHistoryUserMessage/ChatHistoryUserMessage';

@observer
export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        chatHistories: PropTypes.observableArrayOf(PropTypes.observableObject),
        addMessage: ReactPropTypes.func,
        sendMessage: ReactPropTypes.func,
        askOlesya: ReactPropTypes.func,
        children: ReactPropTypes.element,
        profile: PropTypes.observableObject,
        transitFromChatToContacts: ReactPropTypes.func.isRequired,
        name: ReactPropTypes.string,
        avatar: ReactPropTypes.string,
        chatId: ReactPropTypes.string
    };

    render() {
        const chatHistory = this.props.chatHistories
            .find(history => history.chatId === this.props.chatId);
        let chatHistoryToRender;
        if (chatHistory) {
            chatHistoryToRender = chatHistory.messages.map(message => (
                <ChatHistoryUserMessage key={message.id} og={message.og}
                    fromMe={message.from === this.props.profile.id} name={message.name}
                    body={message.body} date={new Date(message.createdAt) || new Date()}/>
            ));
        }

        return (
            <div className={styles.Wrapper}>
                <ChatHeader photoURL={this.props.avatar}
                    name={this.props.name} status={'online'}
                    transitFromChatToContacts={this.props.transitFromChatToContacts}/>
                <ChatHistory>
                    {chatHistoryToRender}
                </ChatHistory>
                <ChatInput chatHistories={this.props.chatHistories}
                    sendMessage={this.props.chatId === 'olesya' ? this.props.askOlesya : this.props.sendMessage}
                    addMessage={this.props.addMessage}
                    chatId={this.props.chatId}
                    profile={this.props.profile}/>
            </div>
        );
    }
}
