import React, { Component } from 'react';
import styles from './SearchResult.css';
import PropTypes from 'prop-types';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        onClick: PropTypes.func,
        onAdd: PropTypes.func,
        login: PropTypes.string,
        avatar: PropTypes.img
    };

    render() {
        return (
            <a className={styles.Wrapper} onClick={this.props.onClick}>
                <img className={styles.Photo} src={this.props.avatar} />
                <span className={styles.Name}>
                    {this.props.login}
                </span>
                <span className={styles.Button}>
                    <input onClick={this.props.onAdd} type="button" value="Add"/>
                </span>
            </a>
        );
    }
}
