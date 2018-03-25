import React, { Component } from 'react';
import styles from './contact.css';

export default class Contact extends Component {
    render() {
        return <div className={styles.MessageItem}>
            <img src="http://bipbap.ru/wp-content/uploads/2017/04/72fqw2qq3kxh.jpg"
                className={styles.MessageAvatar}/>
            <div className={styles.MessageDescription}>
                <div className={styles.MessageAuthor}>{ this.props.name }</div>
                <div className={styles.MessageContent}>{ this.props.message }</div>
            </div>
            <div className={styles.MessageBlock}>
                <div className={styles.MessageDate}>{ this.props.date }</div>
                <div className={styles.MessageAmount}>{ this.props.unread }</div>
            </div>
        </div>;
    }
}
