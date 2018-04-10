import React, { Component } from 'react';
import styles from './ContactsSearch.css';

export default class ContactsSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.Wrapper}>
                <input placeholder="Поиск" className={styles.Input}/>
            </div>
        );
    }
}
