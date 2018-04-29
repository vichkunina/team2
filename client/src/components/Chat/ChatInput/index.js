import React from 'react';
import { PropTypes } from 'mobx-react';
import { observer, inject } from 'mobx-react';
import styles from './index.css';

@inject('chatInputState') @observer
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
            <form id="send-message-form" className={styles.Wrapper}
                onSubmit={this.submitHandler.bind(this)}>
                <button type="button" className={`${styles.ImageButton} ${styles.Button}`}>
                    <i className="material-icons">image</i>
                </button>
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
        );
    }
}
