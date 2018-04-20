/* eslint-disable no-invalid-this*/
import React from 'react';
import { PropTypes } from 'mobx-react';
import { observer, inject } from 'mobx-react';
import styles from './index.css';

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

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    uploadHandler = () => {
        console.log('Some useful info for future', this.state.selectedFile);
    }

    textChangeHandler(event) {
        this.setState({ chatInput: event.target.value });
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
                <div className = {`${styles.AddButton} ${styles.Button}`}>
                    <label>
                        <input type="file" onChange={this.fileChangedHandler.bind(this)}
                            accept="image/*" multiple className={styles.Upload} />
                        <i className="material-icons">add</i>
                    </label>
                </div>
                <button form="send-message-form" type="submit"
                    className={`${styles.SendButton} ${styles.Button}`}>
                    <i onClick={this.uploadHandler.bind(this)}
                        className="material-icons">send</i>
                </button>
            </form>
        );
    }
}
