import React, { Component } from 'react';
import styles from './entryField.css';

export default class EntryField extends Component {
    render() {
        return (
            <section className= {styles.EntryField}>
                <input className={styles.EntryFieldText} type="text"
                    placeholder="Write a message..." />
            </section>);
    }
}
