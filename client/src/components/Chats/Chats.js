import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import ChatEntry from './ChatEntry/ChatEntry';
import styles from './Chats.css';

export default class ContactsSearch extends Component {

    static propTypes = {
        chats: PropTypes.observableArray,
        store: PropTypes.observableObject
    };

    constructor(props) {
        super(props);
        this.state = { chats: this.props.chats };
    }

    filteredList(event) {
        const res = this.props.chats.filter(chat => {
            return chat.name.toLowerCase().search(event.target.value) !== -1;
        });

        this.setState({ chats: res });
    }

    changeChat(chat) {
        this.props.store.currentChat = chat;
    }

    render() {

        const chats = this.state.chats.map(chat => (
            <ChatEntry key={chat.id} photoURL={chat.avatar}
                name={chat.name} lastMessage={chat.lastMessage}
                lastMessageDate={new Date()} unreadCount={chat.unreadCount}
                onClick={this.changeChat.bind(this, chat)}/>
        ));

        return (
            <div className={styles.Wrapper}>
                <div className={styles.Wrappers}>
                    <input placeholder="Поиск" className={styles.Input}
                        onChange={this.filteredList.bind(this)}/>
                    {chats}
                </div>
            </div>
        );
    }
}
