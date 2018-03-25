import React, { Component } from 'react';
import Search from '../search';
import styles from './contactsList.css';

export default class ContactList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.Contacts}>
                <h2 className={styles.Title}>CONTACTI</h2>
                <Search/>
                <div className={styles.Content}>
                    {this.props.children}
                </div>
            </div>);
    }
}
