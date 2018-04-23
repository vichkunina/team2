/* eslint-disable no-invalid-this*/
import React from 'react';
import { PropTypes } from 'mobx-react';
import { observer, inject } from 'mobx-react';
import styles from './index.css';
import Preview from '../ChatPreview/index';

@inject('chatInputState') @observer
export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chatInput: '',
            selectedFile: null };
    }
    static propTypes = {
        chatInputState: PropTypes.observableObject
    };

    submitHandler(event) {
        this.props.chatInputState.submit();
        event.preventDefault();
    }

    // fileChangedHandler = (event) => {
    //     this.setState({ selectedFile: event.target.files[0] });
    // }

    uploadHandler = () => {
        console.log('Some useful info for future', this.state.selectedFile);
    }

    uploadHandler = () => {
        console.log('Some useful info for future', this.state.selectedFile);
    }

    render() {
        return (
            <article className={styles.SendBar}>
                <form id="send-message-form" className={styles.Wrapper}
                    onSubmit={this.submitHandler.bind(this)}>
                    <input type="text" className={styles.Input}
                        value={this.state.chatInput}
                        placeholder=" Write a message..."
                        onChange={this.textChangeHandler.bind(this)}
                        autoFocus />
                    <button type="button" className={`${styles.EmojiButton} ${styles.Button}`}>
                        <i className="material-icons">tag_faces</i>
                    </button>
                    <button form="send-message-form" type="submit"
                        className={`${styles.SendButton} ${styles.Button}`}>
                        <i onClick={this.uploadHandler.bind(this)}
                            className="material-icons">send</i>
                    </button>
                    <Preview />
                </form>
            </article>
        );
    }
}
