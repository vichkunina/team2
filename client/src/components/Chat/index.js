import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ChatHeader from './ChatHeader';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import styles from './index.css';

@observer
export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        chatHistories: PropTypes.observableArrayOf(PropTypes.observableObject),
        sendMessage: ReactPropTypes.func,
        children: ReactPropTypes.element,
        profile: PropTypes.observableObject,
        transitFromChatToContacts: ReactPropTypes.func.isRequired,
        name: ReactPropTypes.string,
        avatar: ReactPropTypes.string,
        children: ReactPropTypes.array
    };

    render() {
        return (
            <div className={styles.Wrapper}>
                <ChatHeader avatar={this.props.avatar}
                    name={this.props.name}
                    status={'online'}/>
                <ChatHistory>
                    {this.props.children}
                </ChatHistory>
                <ChatInput chatHistories={this.props.chatHistories}
                    sendMessage={this.props.sendMessage}
                    chatId={this.props.chatId}
                    profile={this.props.profile}/>
            </div>
        );
    }
}
