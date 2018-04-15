import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ChatSearchResults.css';

export default class ChatSearchResults extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        children: PropTypes.array
    };

    render() {
        return (
            <div className={styles.preloader}>
                {this.props.children}
            </div>
        );
    }
}
