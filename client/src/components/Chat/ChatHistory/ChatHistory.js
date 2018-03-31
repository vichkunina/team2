import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ChatHistory.css';

export default class ChatHistory extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element
        ])
    }

    render() {
        return (
            <div className={styles.Wrapper}>
                <div className={styles.Supporter}></div>
                {this.props.children}
            </div>
        );
    }
}
