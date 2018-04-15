import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ChatHistoryServiceMessage.css';

export default class ChatHistoryServiceMessage extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        text: PropTypes.string.isRequired
    }

    render() {
        return (
            <div className={styles.Message}>{this.props.text}</div>
        );
    }
}
