import React from 'react';
import styles from './ChatInput.css';

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chatInput: '' };
        this.submitHandler = this.submitHandler.bind(this);
        this.textChangeHandler = this.textChangeHandler.bind(this);
    }

    submitHandler(event) {
        event.preventDefault();
        this.setState({ chatInput: '' });
        this.onSend(this.state.chatInput);
    }

    textChangeHandler(event) {
        this.setState({ chatInput: event.target.value });
    }

    render() {
        return (
            <form className={styles.Wrapper} onSubmit={this.submitHandler}>
                <input type="text" className={styles.Input}
                    onChange={this.textChangeHandler}
                    value={this.state.chatInput}
                    placeholder="Write a message..."
                />
                <input type = "submit" value = "Send" className={styles.Send}/>
            </form>
        );
    }
}

ChatInput.defaultProps = {
};

export default ChatInput;

