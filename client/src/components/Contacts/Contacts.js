import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactsSearch from './ContactsSearch/ContactsSearch';

import styles from './Contacts.css';

export default class Contacts extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element
        ])
    };

    render() {
        return (
            <div className={styles.Wrapper}>
                <ContactsSearch />
                {this.props.children}
            </div>);
    }
}
