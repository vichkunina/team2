import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import ReactPropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Chats from '../Chats/Chats';
import Profile from '../Profile/Profile';
import Chat from '../Chat/Chat';
import styles from './App.css';
import ChatEntry from '../Chats/ChatEntry/ChatEntry';

@observer
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showContacts: true,
            showChat: true,
            showProfile: true
        };
    }

    static propTypes = {
        store: ReactPropTypes.shape({
            chats: PropTypes.observableArray,
            currentChat: PropTypes.observableObject,
            profile: PropTypes.observableObject
        }
        )
    };

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
        this.props.store.currentChat = chat;
    }

    render() {
        const chats = this.props.store.chats.map(chat => (
            <ChatEntry key={chat.id} photoURL={chat.avatar}
                name={chat.name} lastMessage={chat.lastMessage}
                lastMessageDate={new Date()} unreadCount={chat.unreadCount}
                onClick={this.changeChat.bind(this, chat)}/>
        ));

        return (
            <div className={styles.Wrapper}>
                { this.state.showContacts &&
                    <Chats chats={this.props.store.chats}
                        currentChat={this.props.store.currentChat}
                        transitFromChatToContacts={ this.transitFromChatToContacts }>
                        {chats}
                    </Chats>
                }
                { this.state.showChat &&
                    <Chat currentChat={this.props.store.currentChat}
                        profile={this.props.store.profile}/>
                }
                { this.state.showProfile &&
                    <Profile profile={this.props.store.profile}
                        transistFromProfileToChat={ this.transitFromProfileToChat } /> }
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

