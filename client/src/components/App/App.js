import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import ReactPropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Chats from '../Chats/Chats';
import Profile from '../Profile/Profile';
import Chat from '../Chat/Chat';
import ChatHistoryServiceMessage from
    '../Chat/ChatHistory/ChatHistoryServiceMessage/ChatHistoryServiceMessage';
import ChatHistoryUserMessage from
    '../Chat/ChatHistory/ChatHistoryUserMessage/ChatHistoryUserMessage';
import styles from './App.css';

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
            chats: PropTypes.observableArray
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

        this.transistFromChatToContacts = this.transistFromChatToContacts.bind(this);
        this.transistFromProfileToChat = this.transistFromProfileToChat.bind(this);
    }

    transistFromChatToContacts() {
        this.closeChat();
        this.openContacts();
    }

    transistFromProfileToChat() {
        this.closeProfile();
        this.openChat();
    }

    render() {
        return (
            <div className={styles.Wrapper}>
                { this.state.showContacts &&
                    <Chats chats={this.props.store.chats}/>
                }
                { this.state.showChat &&
                    <Chat photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                        name="Mark" status="Онлайн"
                        transistFromChatToContacts={ this.transistFromChatToContacts }>
                        <ChatHistoryServiceMessage text="12 марта"/>
                        <ChatHistoryUserMessage fromMe={true} name="Billy" body="Hello!"
                            date={new Date()}
                            ogURL="localhost" ogTitle="Hey!"
                            ogDescription="Hey-hey! Hello! Hello! Hello! Hello! Hello!"
                            ogImage="123.png" />
                        <ChatHistoryUserMessage fromMe={false} name="Mark" body="Hello!"
                            date={new Date()} />
                        <ChatHistoryUserMessage fromMe={true} name="Billy" body="Hello!"
                            date={new Date()} />
                        <ChatHistoryUserMessage fromMe={false} name="Mark" body="Hello!"
                            date={new Date()} />
                        <ChatHistoryUserMessage fromMe={true} name="Billy"
                            body="Hey-hey! Hello! Hello! Hello! Hello! Hello! Hello! Hello"
                            date={new Date()}
                            ogURL="localhost" ogTitle="Hey!"
                            ogImage="123.png" />
                        <ChatHistoryUserMessage fromMe={true} name="Billy" body="Hello!"
                            date={new Date()} />
                        <ChatHistoryUserMessage fromMe={true} name="Billy" body="Hello!"
                            date={new Date()} />
                        <ChatHistoryUserMessage fromMe={false} name="Mark" body="Hello!"
                            date={new Date()} />
                    </Chat> }
                { this.state.showProfile &&
                    /* eslint-disable-next-line max-len */
                    <Profile photoURL="https://pbs.twimg.com/profile_images/929933611754708992/ioSgz49P_400x400.jpg"
                        name="Billy" status="Online" login="billy"
                        transistFromProfileToChat={ this.transistFromProfileToChat } /> }
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

