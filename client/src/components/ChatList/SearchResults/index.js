import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default class SearchResults extends Component {
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
