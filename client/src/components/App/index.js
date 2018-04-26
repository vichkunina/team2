import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { observer, inject, Provider } from 'mobx-react';
import ChatList from '../ChatList';
import Profile from '../Profile';
import Chat from '../Chat';
import ServiceMessage from '../Chat/ChatHistory/ServiceMessage';
import styles from './index.css';
import ChatItem from '../ChatList/ChatItem/index';
import UserMessage from '../Chat/ChatHistory/UserMessage/index';

@inject('rootStore') @observer
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        rootStore: ReactPropTypes.object
    };

    render() {
        const { dataStore, state } = this.props.rootStore;
        const { chatState, chatListState, chatInputState } = state;
        const { loaderState, message } = state.loaderState;

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
                    <ChatList/>}
                    {chatState.currentChat.name
                        ? <Chat name={chatState.currentChat.name}
                            avatar={chatState.currentChat.avatar}
                            chatHistory={chatState.currentChatHistory}
                            profileId={dataStore.profile._id}>
                        </Chat>
                        : <div className={styles.StubWrapper}>
                            <ServiceMessage text="Please select a chat to start messaging"/>
                        </div>
                    }
                    {state.mainView.showProfile &&
                    <Profile profile={dataStore.profile}/>}
                </div>
            </Provider>
        );
    }
}

