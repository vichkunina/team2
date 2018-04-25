import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { observer, inject, Provider } from 'mobx-react';
import ChatList from '../ChatList';
import Profile from '../Profile';
import Chat from '../Chat';
import ServiceMessage from '../Chat/ChatHistory/ServiceMessage';
import ChatItem from '../ChatList/ChatItem';
import UserMessage from '../Chat/ChatHistory/UserMessage';
import styles from './index.css';
import ChatItem from '../ChatList/ChatItem/index';
import UserMessage from '../Chat/ChatHistory/UserMessage/index';

@inject('rootStore') @observer
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        store: ReactPropTypes.shape({
            chats: PropTypes.observableArray,
            profile: PropTypes.observableObject,
            chatHistories: PropTypes.observableArrayOf(PropTypes.observableObject),
            searchResult: PropTypes.observableArray,
            loaderState: ReactPropTypes.object
        }),
        worker: ReactPropTypes.object
    };

    render() {
        const currentChat = this.props.store.chats
            .find(chat => chat._id === this.state.currentChat);
        const chats = this.props.store.chats.map(chat => {
            const chatHistory = this.props.store.chatHistories[chat._id];
            let lastMessage = '';
            if (chatHistory && chatHistory.length > 0) {
                lastMessage = chatHistory[chatHistory.length - 1].body;
            }

            return (
                <ChatItem key={chat._id} photoURL={chat.avatar} name={chat.name}
                    lastMessage={lastMessage}
                    lastMessageDate={new Date()}
                    onClick={this.changeChat.bind(this, chat._id)}/>
            );
        });

        const chatHistory = this.props.store.chatHistories
            .filter(history => history.chatId === this.state.currentChat._id)[0];

        let chatHistoryToRender;
        if (chatHistory) {
            chatHistoryToRender = chatHistory.map(message => (
                <UserMessage key={message._id}
                    fromMe={message.from === this.props.store.profile._id} name={message.name}
                    body={message.body} date={message.date || new Date()}/>
            ));
        }

        let { state, message } = this.props.store.loaderState;

        return (
            <Provider chatInputState={chatInputState}
                chatListState={chatListState}
                chatState={chatState}>
                <div className={styles.Wrapper}>
                    <div className={styles.LoadingScreen}
                        style={{ display: loaderState ? 'flex' : 'none' }}>
                        <div className={styles.LoaderWrapper}>
                            <div className={styles.Loader}/>
                        </div>
                        <div className={styles.LoaderText}>{message}</div>
                    </div>
                    {state.mainView.showContacts &&
                    <ChatList>
                        {chatList}
                    </ChatList>}
                    {chatState.currentChat.name
                        ? <Chat name={chatState.currentChat.name}
                            avatar={chatState.currentChat.avatar}>
                            {chatHistory}
                        </Chat>
                        : <div className={styles.StubWrapper}>
                            <ServiceMessage text="Please select a chat to start messaging"/>
                        </div>
                    }
                    {state.mainView.showProfile &&
                    <Profile profile={dataStore.profile}/>}
                </div>
                {this.state.showContacts &&
                <ChatList chats={this.props.store.chats}
                    currentChat={currentChat}
                    searchByLogin={this.props.worker.searchByLogin.bind(this.props.worker)}
                    searchResult={this.props.store.searchResult}
                    addContact={this.props.worker.addContact.bind(this.props.worker)}>
                    {chats}
                </ChatList>
                }
                {currentChat
                    ? <Chat name={currentChat.name}
                        chatId={currentChat._id}
                        chatHistories={this.props.store.chatHistories}
                        sendMessage={this.props.worker.sendMessage.bind(this.props.worker)}
                        profile={this.props.store.profile}
                        avatar={currentChat.avatar}
                        transitFromChatToContacts={this.transitFromChatToContacts}>
                        {chatHistoryToRender}
                    </Chat>
                    : <div className={styles.StubWrapper}>
                        <ServiceMessage text="Please select a chat to start messaging"/>
                    </div>
                }
                {this.state.showProfile &&
                <Profile profile={this.props.store.profile}
                    closeProfile={this.closeProfile}/>}
            </Provider>
        );
    }
}

