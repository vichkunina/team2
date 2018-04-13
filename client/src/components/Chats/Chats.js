import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import ContactsSearch from './ChatsSearch/ChatsSearch';

import styles from './Chats.css';
import ChatEntry from './ChatEntry/ChatEntry';

export default class Contacts extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        chats: PropTypes.observableArray
    };

    render() {
        const chats = this.props.chats.map(chat => (
            <ChatEntry key={chat.id} photoURL={chat.avatar}
                name={chat.name} lastMessage={chat.lastMessage}
                lastMessageDate={new Date()} unreadCount={chat.unreadCount}/>
        ));

        return (
            <div className={styles.Wrapper}>
                <ContactsSearch/>
                {chats}
            </div>);
    }
}
