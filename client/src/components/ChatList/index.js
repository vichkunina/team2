import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import { observer, inject } from 'mobx-react';
import Contact from '../Contact';
import styles from './index.css';
import ChatItem from './ChatItem/index';

@inject('chatListState', 'chatState') @observer
export default class ChatList extends Component {

    static propTypes = {
        chatListState: PropTypes.observableObject,
        chatState: PropTypes.observableObject
    };

    constructor(props) {
        super(props);
    }

    changeHandler(event) {
        this.props.chatListState.change(event.target.value);
    }

    render() {
        const { chatListState, chatState } = this.props;

        const chatList = chatListState.chatsToDisplay.map(chat => (
            <ChatItem key={chat._id}
                photoURL={chat.avatar}
                name={chat.name}
                lastMessage={chat.lastMessage.body}
                lastMessageDate={chat.lastMessage.createdAt}
                onClick={chatState.selectChat.bind(chatState, chat)}/>
        ));

        const searchResults = chatListState.searchResultsToDisplay.map(chat =>
            <Contact
                key={chat._id}
                login={chat.login}
                avatar={chat.avatar}
                withCheckbox={false}
                onClick={chatListState.addContact.bind(chatListState, chat.login)}/>
        );

        return (
            <div className={styles.Wrapper}>
                <div className={styles.Wrappers}>
                    <form className={styles.SearchForm}>
                        <input placeholder="Search"
                            className={styles.SearchInput}
                            value={chatListState.chatInput}
                            onChange={this.changeHandler.bind(this)}/>
                    </form>
                    {chatList}
                    {searchResults.length !== 0 &&
                    <div className={styles.GlobalSearchSeparator}>
                        <span className={styles.GlobalSearchHeader}>
                            Global search results
                        </span>
                    </div>
                    }
                    {searchResults}
                </div>
            </div>
        );
    }
}
