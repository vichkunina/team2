import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import ChatHeader from './ChatHeader';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import styles from './index.css';

@inject('chatPreviewState') @observer
export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        name: ReactPropTypes.string,
        avatar: ReactPropTypes.string,
        children: ReactPropTypes.array,
        chatPreviewState: ReactPropTypes.object
    };

    render() {
        return (
            <div className={styles.Wrapper} >
                <ChatHeader avatar={this.props.avatar}
                    name={this.props.name}
                    status={'online'}/>
                <ChatHistory>
                    {this.props.children}
                </ChatHistory>
                <ChatInput/>
            </div>
        );
    }
}
