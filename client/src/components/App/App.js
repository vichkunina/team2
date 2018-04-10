import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Contacts from '../Contacts/Contacts';
import ContactsEntry from '../Contacts/ContactsEntry/ContactsEntry';
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
                    <Contacts>
                        <ContactsEntry photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                            name="Mark" lastMessage="Hello! How are you, my friend?"
                            lastMessageDate={new Date()} unreadCount={2} />
                        <ContactsEntry photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                            name="Mark" lastMessage="Hello!"
                            lastMessageDate={new Date()} unreadCount={12} />
                        <ContactsEntry photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                            name="Mark" lastMessage="Hello! Hello! Hello! Hello!"
                            lastMessageDate={new Date()} unreadCount={0} />
                        <ContactsEntry photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                            name="Mark" lastMessage="Hello!"
                            lastMessageDate={new Date()} unreadCount={4} />
                        <ContactsEntry photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                            name="Mark" lastMessage="Hello!"
                            lastMessageDate={new Date()} unreadCount={345} />
                        <ContactsEntry photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                            name="Mark" lastMessage="Hello!"
                            lastMessageDate={new Date()} unreadCount={1} />
                        <ContactsEntry photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                            name="Mark" lastMessage="Hello!"
                            lastMessageDate={new Date()} unreadCount={0} />
                        <ContactsEntry photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                            name="Mark" lastMessage="Hello!"
                            lastMessageDate={new Date()} unreadCount={2} />
                        <ContactsEntry photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                            name="Mark" lastMessage="Hello!"
                            lastMessageDate={new Date()} unreadCount={2} />
                        <ContactsEntry photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                            name="Mark" lastMessage="Hello!"
                            lastMessageDate={new Date()} unreadCount={2} />
                    </Contacts>
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
