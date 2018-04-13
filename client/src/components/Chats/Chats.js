import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import ContactsSearch from './ChatsSearch/ChatsSearch';

import styles from './Chats.css';
// import ChatEntry from './ChatEntry/ChatEntry';

export default class Contacts extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        chats: PropTypes.observableArray
    };

    render() {

        return (
            <div className={styles.Wrapper}>
                <ContactsSearch chats = {this.props.chats}/>
            </div>);
    }
}
