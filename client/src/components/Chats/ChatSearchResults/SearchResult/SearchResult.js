import React, { Component } from 'react';
import styles from './SearchResult.css';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a className={styles.Wrapper} onClick={this.props.onClick}>
                <img className={styles.Photo} src={this.props.avatar} />
                <span className={styles.Name}>
                    {this.props.login}
                </span>
                <span class={styles.Button}>
                    <input onClick={this.props.onAdd} type="button" value="Add"/>
                </span>
            </a>
        )
    }
}