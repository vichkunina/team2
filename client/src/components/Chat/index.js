import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ChatHeader from './ChatHeader';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import EmojiPicker from 'emoji-picker-react';
import styles from './index.css';
import { inject } from 'mobx-react';
import { PropTypes as MobxPropsTypes } from 'mobx-react';

@inject('reactionSelectorState') @observer
export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        reactionSelectorState: MobxPropsTypes.observableObject,

        name: ReactPropTypes.string,
        avatar: ReactPropTypes.string,
        children: ReactPropTypes.array
    };

    sendReaction(code) {
        this.props.reactionSelectorState.sendReaction(code);
    }

    render() {
        const emojiPickerStyle = {
            top: this.props.reactionSelectorState.top,
            left: this.props.reactionSelectorState.left
        };

        return (
            <div className={styles.Wrapper}>
                {this.props.reactionSelectorState.show &&
                <div className={styles.EmojiPicker} style={emojiPickerStyle}>
                    <EmojiPicker
                        onEmojiClick={this.sendReaction.bind(this)}/>
                </div>
                }
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
