import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { PropTypes } from 'mobx-react';
import { observer } from 'mobx-react';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatHistory from './ChatHistory/ChatHistory';
import ChatInput from './ChatInput/ChatInput';
import styles from './Chat.css';

@observer
export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        chatHistory: ReactPropTypes.shape({
            chatHistory: PropTypes.observableArray,
            avatar: ReactPropTypes.string,
            name: ReactPropTypes.string
        }),
        children: ReactPropTypes.element,
        profile: PropTypes.observableObject,
        transitFromChatToContacts: ReactPropTypes.func.isRequired,
        name: ReactPropTypes.string
    };

    render() {
        if (this.props.children) {
            return (
                <div className={styles.Wrapper}>
                    <ChatHeader photoURL={'avatar'}
                        name={this.props.name} status={'online'}
                        transitFromChatToContacts={this.props.transitFromChatToContacts}/>
                    <ChatHistory>
                        {this.props.children}
                    </ChatHistory>
                    <ChatInput currentChatHistory={this.props.chatHistory}
                        profile={this.props.profile}/>
                </div>
            );
        }

        return (
            <div className={styles.Wrapper}>
                <span className={styles.EmptyChat}>Choose chat to start messaging</span>
            </div>
        );
    }
}
