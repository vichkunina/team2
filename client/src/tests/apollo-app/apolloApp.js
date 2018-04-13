import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Contacts from '../../components/Contacts/Contacts';
import ChatEntry from '../../components/Contacts/ContactsEntry/ContactsEntry';
import Profile from '../../components/Profile/Profile';
import Chat from '../../components/Chat/Chat';
import ChatHistoryServiceMessage from
    '../../components/Chat/ChatHistory/ChatHistoryServiceMessage/ChatHistoryServiceMessage';
import ChatHistoryUserMessage from
    '../../components/Chat/ChatHistory/ChatHistoryUserMessage/ChatHistoryUserMessage';
import styles from '../../components/App/App.css';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import ApolloClient from 'apollo-client';
import { HttpLink }  from 'apollo-link-http';
import { split as apsplit } from 'apollo-link';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { getCookie } from '../../utils/cookie'

const link = apsplit(
    ({ query: { definitions } }) =>
        definitions.some(
            ({ kind, operation }) =>
                kind === 'OperationDefinition' && operation === 'subscription',
        ),
    new WebSocketLink({
        uri:
            'ws://localhost:8081',
        options: {
            reconnect: true,
            connectionParams: getCookie('connect.sid')
        },
    }),
    new HttpLink({
        uri: 'http://localhost:8080/api',
    }),
);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
});

// client.query({
//     query: gql`
//         mutation {
//             addContact(id: "${user.id}") {
//                 users {
//                     id
//                 }
//             }
//         }
//     `
// });


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
        const ChatList = () => (
            <Query
                query={gql`
            {
                profile {
                    chats {
                        id
                    }
                }
            }

              `}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <p>Loading...</p>;
                    }
                    if (error) {
                        return <p>Error :(</p>;
                    }
                    console.log('data: ');
                    console.log(data);
                    if (data.profile.chats && data.profile.chats.length !== 0) {
                        return data.profile.chats.map(({ id }) => (
                            <ChatEntry key={id} photoURL={'sosat'} name={id} lastMessage={'hey'}
                                lastMessageDate={new Date()} unreadCount={id.charCodeAt(0)}/>
                        ));
                    }

                    return (
                        <div>
                            You have no friends sorry
                        </div>
                    );

                }}
            </Query>
        );

        return (
            <ApolloProvider client={client}>
                <div className={styles.Wrapper}>
                    {this.state.showContacts &&
                  <Contacts>
                      <ChatList/>
                  </Contacts>
                    }
                    {this.state.showChat &&
                  <Chat photoURL="http://www.baretly.org/uploads/14775998111.jpg"
                      name="Mark" status="Онлайн"
                      transistFromChatToContacts={this.transistFromChatToContacts}>
                      <ChatHistoryServiceMessage text="12 марта"/>
                      <ChatHistoryUserMessage fromMe={true} name="Billy" body="Hello!"
                          date={new Date()}
                          ogURL="localhost" ogTitle="Hey!"
                          ogDescription="Hey-hey! Hello! Hello! Hello! Hello! Hello!"
                          ogImage="123.png"/>
                      <ChatHistoryUserMessage fromMe={false} name="Mark" body="Hello!"
                          date={new Date()}/>
                      <ChatHistoryUserMessage fromMe={true} name="Billy" body="Hello!"
                          date={new Date()}/>
                      <ChatHistoryUserMessage fromMe={false} name="Mark" body="Hello!"
                          date={new Date()}/>
                      <ChatHistoryUserMessage fromMe={true} name="Billy"
                          body="Hey-hey! Hello! Hello! Hello! Hello! Hello! Hello! Hello"
                          date={new Date()}
                          ogURL="localhost" ogTitle="Hey!"
                          ogImage="123.png"/>
                      <ChatHistoryUserMessage fromMe={true} name="Billy" body="Hello!"
                          date={new Date()}/>
                      <ChatHistoryUserMessage fromMe={true} name="Billy" body="Hello!"
                          date={new Date()}/>
                      <ChatHistoryUserMessage fromMe={false} name="Mark" body="Hello!"
                          date={new Date()}/>
                  </Chat>}
                    {this.state.showProfile &&
                  /* eslint-disable-next-line max-len */
                  <Profile
                      photoURL="https://pbs.twimg.com/profile_images/929933611754708992/ioSgz49P_400x400.jpg"
                      name="Billy" status="Online" login="billy"
                      transistFromProfileToChat={this.transistFromProfileToChat}/>}
                </div>
            </ApolloProvider>
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
