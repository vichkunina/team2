/* eslint-disable no-invalid-this*/
import React from 'react';
import { PropTypes } from 'mobx-react';
import { observer, inject } from 'mobx-react';
import styles from './index.css';
import Preview from '../ChatPreview/index';

@inject('chatInputState', 'chatPreviewState') @observer
export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        chatInputState: PropTypes.observableObject
    };

    submitHandler(event) {
        this.props.chatInputState.submit();
        event.preventDefault();
    }

    changeHandler(event) {
        this.props.chatInputState.change(event.target.value);
    }

    render() {
        return (
            <article className={styles.SendBar}>
                <form id="send-message-form" className={styles.Wrapper}
                    onSubmit={this.submitHandler.bind(this)}>
                    <Preview chatPreviewState={this.props.chatPreviewState}/>
                    <input type="text" className={styles.Input}
                        value={this.props.chatInputState.chatInput}
                        placeholder=" Write a message..."
                        onChange={this.changeHandler.bind(this)}
                        autoFocus/>
                    <button type="button" className={`${styles.EmojiButton} ${styles.Button}`}>
                        <i className="material-icons">tag_faces</i>
                    </button>
                    <button form="send-message-form" type="submit"
                        className={`${styles.SendButton} ${styles.Button}`}>
                        <i className="material-icons">send</i>
                    </button>
                </form>
            </article>
        );
    }
}
