/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import styles from './userInfo.css';

export default class UserInfo extends Component {
    render() {
        return (
            <div>
                <div className={styles.Header}>{this.props.title}</div>
                <div className={styles.UserPhoto}></div>
                <div className={styles.HeaderName}>{this.props.name}</div>
                <div className={styles.Page}>
                    <div className={styles.HeaderStatus}>{this.props.status}</div>
                    <div className={styles.HeaderMail}>
                        {this.props.mail}:{this.props.mailValue}</div>
                </div>
            </div>
        );
    }
}


