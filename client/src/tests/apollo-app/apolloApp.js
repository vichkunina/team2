/* eslint-disable */

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Contacts from '../../components/Contacts/Contacts';
import ChatEntry from '../../components/Contacts/ContactsEntry/ContactsEntry';
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
                  console.log('data: ');
                  console.log(data);
                  if (data.profile.login && data.profile.avatar) {
                      return <Profile
                        photoURL={data.profile.avatar}
                        name={data.profile.login} status="Online" login={data.profile.login}
                        transistFromProfileToChat={this.transistFromProfileToChat}/>;

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
                }
              }
            }

              `}>
              {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;
                  console.log('data: ');
                  console.log(data);
                  if (data.profile.chats && data.profile.chats.length !== 0) {
                      return data.profile.chats.map(({ id, avatar, name }) => (
                        <ChatEntry key={id} photoURL={avatar} name={name} lastMessage={'hey'}
                          lastMessageDate={new Date()} unreadCount={id.charCodeAt(0)}/>
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
