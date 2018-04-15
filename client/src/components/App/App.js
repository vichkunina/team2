import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import ReactPropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Chats from '../Chats/Chats';
import Profile from '../Profile/Profile';
import Chat from '../Chat/Chat';
import styles from './App.css';
import ChatEntry from '../Chats/ChatEntry/ChatEntry';
import * as States from '../../enum/LoadState';
import ChatHistoryUserMessage from
    '../Chat/ChatHistory/ChatHistoryUserMessage/ChatHistoryUserMessage';

@observer
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showContacts: true,
            showChat: true,
            showProfile: true,
            currentChat: ''
        };
    }

    static propTypes = {
        store: ReactPropTypes.shape({
            addMessage: ReactPropTypes.func,
            chats: PropTypes.observableArray,
            profile: PropTypes.observableObject,
            chatHistories: PropTypes.observableArrayOf(PropTypes.observableObject),
            searchResult: PropTypes.observableArray
        }),
        worker: ReactPropTypes.object
    };

    componentDidMount() {
        this.props.worker.getProfile();
    }

    componentWillMount() {
        this.openContacts = this.openContacts.bind(this);
        this.openChat = this.openChat.bind(this);
        this.openProfile = this.openProfile.bind(this);

        this.closeContacts = this.closeContacts.bind(this);
        this.closeChat = this.closeChat.bind(this);
        this.closeProfile = this.closeProfile.bind(this);

        this.transitFromChatToContacts = this.transitFromChatToContacts.bind(this);
        this.transitFromProfileToChat = this.transitFromProfileToChat.bind(this);
    }

    transitFromChatToContacts() {
        this.closeChat();
        this.openContacts();
    }

    transitFromProfileToChat() {
        this.closeProfile();
        this.openChat();
    }

    changeChat(chat) {
        console.log('CHANGE CHAT', chat);
        this.setState({ currentChat: chat });
    }

    render() {
        const currentChat = this.state.currentChat === 'olesya' ? this.props.store.olesyaChat :
            this.props.store.chats.find(chat => chat.id === this.state.currentChat);
        const chats = this.props.store.chats.map(chat => {
            const chatHistory = this.props.store.chatHistories[chat.id];
            let lastMessage = '';
            if (chatHistory && chatHistory.length > 0) {
                lastMessage = chatHistory[chatHistory.length - 1].body;
            }

            return (
                <ChatEntry key={chat.id} photoURL={chat.avatar} name={chat.name}
                    lastMessage={lastMessage}
                    lastMessageDate={new Date()}
                    onClick={this.changeChat.bind(this, chat.id)}/>
            );
        });

        chats.unshift(
            <ChatEntry key={'olesya'} photoURL={''} name={'Olesya'}
                lastMessage={''}
                lastMessageDate={new Date()}
                onClick={this.changeChat.bind(this, 'olesya')}/>
        );

        const chatHistory = this.props.store.chatHistories
            .filter(history => history.chatId === this.state.currentChat.id)[0];

        let chatHistoryToRender;
        if (chatHistory) {
            chatHistoryToRender = chatHistory.map(message => (
                <ChatHistoryUserMessage key={message.id}
                    fromMe={message.from === this.props.store.profile.id} name={message.name}
                    body={message.body} date={message.date || new Date()}/>
            ));
        }

        let state;
        let message = '';
        // eslint-disable-next-line react/prop-types
        let loadingState = this.props.store.loadingState;

        if (loadingState === States.LOADED) {
            state = false;
        }

        if (loadingState === States.LOAD_CONTACTS) {
            state = true;
            message = 'Загружаем контакты...';
        }

        if (loadingState === States.LOAD_PROFILE) {
            state = true;
            message = 'Загружаем профиль...';
        }

        if (loadingState === States.ADD_CONTACT) {
            state = true;
            message = 'Добавляем контакт...';
        }

        return (
            <div className={styles.Wrapper}>
                <div className={styles.LoaderWrap} style={{ display: state ? 'flex' : 'none' }}>
                    <div className={styles.preloader}>
                        <div className={styles.loader}/>
                    </div>
                    <div className={styles.LoaderWraperText}>{message}</div>
                </div>
                {this.state.showContacts &&
                <Chats chats={this.props.store.chats}
                    currentChat={currentChat}
                    searchByLogin={this.props.worker.searchByLogin.bind(this.props.worker)}
                    searchResult={this.props.store.searchResult}
                    addContact={this.props.worker.addContact.bind(this.props.worker)}>
                    {chats}
                </Chats>
                }
                {currentChat
                    ? <Chat name={currentChat.name}
                        chatId={currentChat.id}
                        chatHistories={this.props.store.chatHistories}
                        addMessage={this.props.store.addMessage.bind(this.props.store)}
                        sendMessage={this.props.worker.sendMessage.bind(this.props.worker)}
                        profile={this.props.store.profile}
                        avatar={currentChat.avatar}
                        transitFromChatToContacts={this.transitFromChatToContacts}>
                        {chatHistoryToRender}
                    </Chat>
                    : <div className={styles.StubWrapper}>
                        <span className={styles.EmptyChat}>Choose chat to start messaging</span>
                    </div>
                }
                {this.state.showProfile &&
                <Profile profile={this.props.store.profile}
                    transistFromProfileToChat={this.transitFromProfileToChat}/>}
            </div>
        );
    }

    openContacts() {
        this.setState({ showContacts: true });
    }

    openChat() {
        this.setState({ showChat: true });
    }

    openProfile() {
        this.setState({ showProfile: true });
    }

    closeContacts() {
        this.setState({ showContacts: false });
    }

    closeChat() {
        this.setState({ showChat: false });
    }

    closeProfile() {
        this.setState({ showProfile: false });
    }
}

