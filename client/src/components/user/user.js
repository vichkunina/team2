import React, { Component } from 'react';
import styles from './user.css';

export default class User extends Component {
    render() {
        return (
            <header className={styles.Header}>
                <div className={styles.headerName}>Екатерина</div>
                <div className={styles.headerStatus}>Online</div>
            </header>
        );
    }
}
