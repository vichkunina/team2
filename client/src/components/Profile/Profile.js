import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import styles from './Profile.css';
import { observer } from 'mobx-react';

@observer
export default class Profile extends Component {
    static propTypes = {
        transitFromProfileToChat: ReactPropTypes.func.isRequired,
        profile: ReactPropTypes.shape({
            avatar: ReactPropTypes.string,
            name: ReactPropTypes.string,
            login: ReactPropTypes.string
        }
        )
    };

    render() {
        return (
            <div className={styles.Wrapper}>
                <button className={styles.BackButton}
                    onClick={this.props.transitFromProfileToChat}>&larr;</button>
                <img className={styles.Photo} src={this.props.profile.avatar}></img>
                <div className={styles.Info}>
                    <div className={styles.Name}>{this.props.profile.name}</div>
                    <div className={styles.Status}>{'online'}</div>
                    <div className={styles.Login}>
                        <span className={styles.LoginHeader}>Имя пользователя: </span>
                        <span className={styles.LoginValue}>@{this.props.profile.login}</span>
                    </div>
                </div>
            </div>
        );
    }
}


