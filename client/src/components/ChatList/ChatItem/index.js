import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../Contact/Avatar';
import styles from './index.css';

export default class ChatItem extends Component {
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
        onClick: PropTypes.func
    };

    render() {
        return (
            <a className={styles.Wrapper} onClick={this.props.onClick}>
                <Avatar src={this.props.photoURL} size={52} />
                <span className={styles.Name}>
                    {this.props.name}
                </span>
                <span className={styles.LastMessage}>
                    {this.props.lastMessage}
                </span>
                <span className={styles.LastMessageDate}>
                    {this._formatDate(this.props.lastMessageDate)}
                </span>
            </a>
        );
    }

    _formatDate(date) {
        if (Date.now() - date.getTime() < ChatItem.dayInterval) {
            return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        } else if (Date.now() - date.getTime() < this.weekInterval) {
            return date.toLocaleDateString('ru-RU', { weekday: 'long' });
        }

        return date.toLocaleDateString('ru-RU');
    }
}
