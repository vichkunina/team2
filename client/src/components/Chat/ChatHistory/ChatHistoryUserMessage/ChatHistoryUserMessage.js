import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatHistoryUserMessageOGAttachment from
    './ChatHistoryUserMessageOGAttachment/ChatHistoryUserMessageOGAttachment';
import styles from './ChatHistoryUserMessage.css';

export default class ChatHistoryUserMessage extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        fromMe: PropTypes.bool.isRequired,
        name: PropTypes.string,
        body: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        ogURL: PropTypes.string,
        ogTitle: PropTypes.string,
        ogDescription: PropTypes.string,
        ogImage: PropTypes.string
    };

    render() {
        const className =
            `${styles.Wrapper} ${this.props.fromMe ? styles.FromMe : styles.FromSomeone}`;

        return (
            <div className={className}>
                <span className={styles.Name}>{this.props.name}</span>
                <div className={styles.Body}>{this.props.body}</div>
                {this.props.ogTitle &&
                    <ChatHistoryUserMessageOGAttachment
                        url={this.props.ogURL} title={this.props.ogTitle}
                        description={this.props.ogDescription} image={this.props.ogImage} />}
                <time className={styles.Time}>
                    {this._formatDate(this.props.date)}
                </time>
            </div>
        );
    }

    _formatDate(date) {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }
}
