/* eslint-disable */

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Chats from '../../components/Contacts/Contacts';
import ChatListEntry from '../../components/Contacts/ContactsEntry/ContactsEntry';
import Profile from '../../components/Profile/Profile';
import Chat from '../../components/Chat/Chat';
import ChatHistoryServiceMessage from
  '../../components/Chat/ChatHistory/ChatHistoryServiceMessage/ChatHistoryServiceMessage';
import ChatHistoryUserMessage from
  '../../components/Chat/ChatHistory/ChatHistoryUserMessage/ChatHistoryUserMessage';
import styles from '../../components/App/App.css';

import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';

const link = createHttpLink({
    uri: 'http://localhost:8080/api',
    credentials: 'include',
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});


@observer
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showContacts: true,
            showChat: true,
            showProfile: true,
            currentChat: {}
        };
    }

    componentWillMount() {
        client.query({
            query: gql`
        {
            profile {
                chats {
                    id
                    avatar
                    name
                }
            }
        }`
        }).then(({ data }) => {
            console.log(data);
            this.setState({currentChat: data.profile.chats[0] || {}})
        });

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

    render() {
        const ChatHistory = ({ chatId }) => (
          <Query query={gql`
                {
                    getLastMessages(chatId:"${chatId}", count:20) {
                        id
                        body
                        from {
                          login
                        }
                        createdAt
                    }
                    profile {
                        login
                    }
            }
            `}>
              {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;

                  if (data.getLastMessages.length !== 0) {
                      return data.getLastMessages.map(({ id, from, body, createdAt }) => (
                        <ChatHistoryUserMessage key={id} fromMe={data.profile.login === from.login}
                          name={from.login} body={body} date={new Date(createdAt)}/>
                      ));
                  } else {
                      return (<div>
                          There are no messages yet
                      </div>)
                  }
              }}
          </Query>
        );
        const ProfileEntry = () => (
          <Query
            query={gql`
                {
                    profile {
                        login
                        avatar
                    }
                }
                `}>
              {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;

                  if (data.profile.login && data.profile.avatar) {
                      return <Profile
                        photoURL={data.profile.avatar}
                        name={data.profile.login} status="Online" login={data.profile.login}
                        transistFromProfileToChat={this.transitFromProfileToChat}/>;

                  } else {
                  }
                  return (
                    <div>
                        You have no login and avatar
                    </div>
                  );
              }}
          </Query>
        );
        const ChatList = () => (
          <Query
            query={gql`
            {
                profile {
                    chats {
                      id
                      avatar
                      name
                      lastMessage {
                            body
                        }
                    }
                  }
            }

              `}>
              {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;

                  if (data.profile.chats && data.profile.chats.length !== 0) {
                      return data.profile.chats.map((chat) => (
                        <ChatListEntry key={chat.id} photoURL={chat.avatar} name={chat.name}
                          lastMessage={chat.lastMessage ? chat.lastMessage.body : 'These are not messages yet'}
                          lastMessageDate={new Date()} unreadCount={chat.id.charCodeAt(0)}/>
                      ));
                  } else {
                      return (
                        <div>
                            You have no friends sorry
                        </div>
                      );
                  }
              }}
          </Query>
        );
        return (
          <ApolloProvider client={client}>
              <div className={styles.Wrapper}>
                  {this.state.showContacts &&
                  <Chats>
                      <ChatList/>
                  </Chats>
                  }
                  {this.state.showChat &&
                  <Chat photoURL={this.state.currentChat.avatar}
                    name={this.state.currentChat.name} status="Онлайн"
                    transistFromChatToContacts={this.transitFromChatToContacts}>
                      <ChatHistoryServiceMessage text="12 марта"/>
                      <ChatHistory chatId={this.state.currentChat.id}/>
                  </Chat>}
                  {this.state.showProfile &&
                  <ProfileEntry/>}
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
