import React, { Component } from 'react';
import styles from './ChatInput.css';

export default class Input extends Component {
    render() {
        return (
            <div className= {styles.Wrapper}>
                <input className={styles.Input} type="text" placeholder="Напишите сообщение..." />
            </div>
        );
    }
}
