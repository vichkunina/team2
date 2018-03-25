import React, { Component } from 'react';
import styles from './contact.css';

export default class Contact extends Component {
    render() {
        return <div className={styles.MessageItem}>
            <img src="http://bipbap.ru/wp-content/uploads/2017/04/72fqw2qq3kxh.jpg"
                className={styles.MessageAvatar}/>
            <div className={styles.MessageDescription}>
                <div className={styles.MessageAuthor}>Билли</div>
                <div className={styles.MessageContent}>Хочу молоко</div>
            </div>
            <div className={styles.MessageBlock}>
                <div className={styles.MessageDate}>12/08</div>
                <div className={styles.MessageAmount}>5</div>
            </div>
        </div>;
    }
}
