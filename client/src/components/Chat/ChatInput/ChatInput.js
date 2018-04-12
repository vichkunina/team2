import React, { Component } from 'react';
import styles from './ChatInput.css';


export default class Input extends Component {
    render() {
        return (
            <form className= {styles.Wrapper}>
                <input className={styles.Input} type="text" placeholder="Напишите сообщение..." />
                <input type = "image" value = "Send" className={styles.Send}/>
            </form>
        );
    }
}
