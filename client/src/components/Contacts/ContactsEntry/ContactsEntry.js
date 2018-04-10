import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactsEntry.css';

export default class ContactsEntry extends Component {
    constructor(props) {
        super(props);
    }

    static dayInterval = 1000 * 60 * 60 * 24;
    static weekInterval = 1000 * 60 * 60 * 24 * 7;
    static propTypes = {
        photoURL: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        lastMessage: PropTypes.string.isRequired,
        lastMessageDate: PropTypes.instanceOf(Date).isRequired,
        unreadCount: PropTypes.number.isRequired
    };

    render() {
        return (
            <a className={styles.Wrapper}>
                <img className={styles.Photo} src={this.props.photoURL} />
                <span className={styles.Name}>
                    {this.props.name}
                </span>
                <span className={styles.LastMessage}>
                    {this.props.lastMessage}
                </span>
                <span className={styles.LastMessageDate}>
                    {this._formatDate(this.props.lastMessageDate)}
                </span>
                {this.props.unreadCount !== 0 &&
                    <span className={styles.UnreadCount}>{this.props.unreadCount}</span>}
            </a>
        );
    }

    _formatDate(date) {
        if (Date.now() - date.getTime() < ContactsEntry.dayInterval) {
            return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        } else if (Date.now() - date.getTime() < this.weekInterval) {
            return date.toLocaleDateString('ru-RU', { weekday: 'long' });
        }

        return date.toLocaleDateString('ru-RU');
    }
}
