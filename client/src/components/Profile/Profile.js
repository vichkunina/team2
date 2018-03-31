import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.css';

export default class Profile extends Component {
    static propTypes = {
        photoURL: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        transistFromProfileToChat: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className={styles.Wrapper}>
                <button className={styles.BackButton}
                    onClick={ this.props.transistFromProfileToChat }>&larr;</button>
                <img className={styles.Photo} src={this.props.photoURL}></img>
                <div className={styles.Info}>
                    <div className={styles.Name}>{this.props.name}</div>
                    <div className={styles.Status}>{this.props.status}</div>
                    <div className={styles.Login}>
                        <span className={styles.LoginHeader}>Имя пользователя: </span>
                        <span className={styles.LoginValue}>@{this.props.login}</span>
                    </div>
                </div>
            </div>
        );
    }
}


