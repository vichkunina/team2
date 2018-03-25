import React, { Component } from 'react';
import styles from './chatHistory.css';

export default class ChatHistory extends Component {
    render() {
        return (
            <section className={styles.Content}>
                <div className={styles.ContentDate}>Дата</div>
                <div className={styles.ContentMessages}>
                    <article className={styles.MessageFriend}>
                        <div className={styles.MessageFriendInfo}>Служебная информация</div>
                        <div className={styles.MessageFriendText}>Текст сообщения</div>
                        <time className={styles.MessageFriendTime}>Время</time>
                    </article>
                    <article className={styles.MessageMe}>
                        <div className={styles.MessageMeInfo}>Служебная информация</div>
                        <div className={styles.MessageMeText}>Текст сообщения</div>
                        <time className={styles.MessageMeTime}>Время</time>
                    </article>
                </div>
            </section>);
    }
}
