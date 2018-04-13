import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatHistory from './ChatHistory/ChatHistory';
import ChatInput from './ChatInput/ChatInput';
import styles from './Chat.css';

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
        return (
            <div className={styles.Wrapper}>
                <ChatHeader photoURL={this.props.photoURL}
                    name={this.props.name} status={this.props.status}
                    transistFromChatToContacts={ this.props.transistFromChatToContacts } />
                <ChatHistory>
                    {this.props.children}
                </ChatHistory>
                <ChatInput />
            </div>
        );
    }
}


