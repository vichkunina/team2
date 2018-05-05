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

@inject('reactionSelectorState', 'state') @observer
export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        reactionSelectorState: MobxPropsTypes.observableObject,
        state: MobxPropsTypes.observableObject,
        name: ReactPropTypes.string,
        avatar: ReactPropTypes.string,
        children: ReactPropTypes.array,
        inviteLink: ReactPropTypes.string
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
            <div className={styles.Wrapper}
                onClick={this.props.state.closeProfile.bind(this.props.state)}>
                {this.props.reactionSelectorState.show &&
                <div className={styles.EmojiPicker} style={emojiPickerStyle}>
                    <EmojiPicker
                        onEmojiClick={this.sendReaction.bind(this)}/>
                </div>
                }
                <ChatHeader avatar={this.props.avatar}
                    name={this.props.name}
                    status={'online'}
                    inviteLink={this.props.inviteLink}/>
                <ChatHistory>
                    {this.props.children}
                </ChatHistory>
                <ChatInput/>
            </div>
        );
    }
}
