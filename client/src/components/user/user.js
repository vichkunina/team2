import React, { Component } from 'react';
import styles from './user.css';

export default class User extends Component {
    render() {
        return (
            <header className={styles.Header}>
                <div className={styles.HeaderName}>Екатерина</div>
                <div className={styles.HeaderStatus}>Online</div>
            </header>
        );
    }
}
