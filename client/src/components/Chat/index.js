import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ChatHeader from './ChatHeader';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import styles from './index.css';
import UserMessage from './ChatHistory/UserMessage/index';

@observer
export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        name: ReactPropTypes.string,
        avatar: ReactPropTypes.string,
        children: ReactPropTypes.array,
        profileId: ReactPropTypes.string,
        chatHistory: ReactPropTypes.object
    };

    render() {
        const chatHistory = this.props.chatHistory.map(message => (
            <UserMessage key={message._id}
                fromMe={message.from === this.props.profileId}
                name={message.name}
                body={message.body}
                date={message.createdAt}/>
        ));

        return (
            <div className={styles.Wrapper}>
                <ChatHeader avatar={this.props.avatar}
                    name={this.props.name}
                    status={'online'}/>
                <ChatHistory>
                    {chatHistory}
                </ChatHistory>
                <ChatInput/>
            </div>
        );
    }
}
