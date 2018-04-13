import React, { Component } from 'react';
import styles from './ChatsSearch.css';
import { PropTypes } from 'mobx-react';
import ChatEntry from '../ChatEntry/ChatEntry';

export default class ContactsSearch extends Component {

    static propTypes = {
        chats: PropTypes.observableArray
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

    render() {

        const chats = this.state.chats.map(chat => (
            <ChatEntry key={chat.id} photoURL={chat.avatar}
                name={chat.name} lastMessage={chat.lastMessage}
                lastMessageDate={new Date()} unreadCount={chat.unreadCount}/>
        ));

        return (
            <div className={styles.Wrapper}>
                <input placeholder="Поиск" className={styles.Input}
                    onChange={this.filteredList.bind(this)}/>
                {chats}
            </div>
        );
    }
}
