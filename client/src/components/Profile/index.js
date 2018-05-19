import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import styles from './index.css';
import Popup from 'reactjs-popup';

@inject('state') @observer
export default class Profile extends Component {
    static propTypes = {
        closeProfile: PropTypes.func,
        state: PropTypes.object,
        profile: PropTypes.shape({
            avatar: PropTypes.string,
            login: PropTypes.string
        }
        )
    };

    defaultStyleOverrideNight = {
        width: '420px',
        padding: '0',
        'borderRadius': '4px',
        background: 'gray',
        color: 'white'
    };

    changeHandler(event) {
        this.props.state.uploadAvatar(event.currentTarget.files[0]);
        event.currentTarget.value = '';
    }

    render() {
        return (
            <div className={!this.props.state.mainView.isNightTheme
                ? styles.Wrapper : styles.WrapperNight}
            onClick={this.props.state.showProfile.bind(this.props.state)}>
                <img className={this.props.state.loadAvatar ? styles.Loader : styles.Photo}
                    src={this.props.profile.avatar}/>
                <div className={styles.Info}>
                    <div title={this.props.profile.login}>
                        <div className={styles.Name}>{this.props.profile.login}</div>
                    </div>
                    <input type="file" onChange={this.changeHandler.bind(this)}
                        accept="image/*" className={styles.ChangeAvatarButton}/>
                    <span className={styles.ChangeAvatar}>Change avatar</span>
                    {this.props.state.error &&
                    <Popup
                        open={true}
                        modal
                        closeOnEscape
                        closeOnDocumentClick
                        contentStyle={!this.props.state.mainView.isNightTheme
                            ? this.defaultStyleOverride : this.defaultStyleOverrideNight}
                        onClose={this.props.state.clearError}
                    >
                        {
                            (close) => (
                                <div className={styles.PopupContainer}>
                                    <span className={styles.ErrorMessage}>
                                        {this.props.state.error}
                                    </span>
                                    { <span className={styles.PopupClose} onClick={close}>
                                        <i className="material-icons">close</i>
                                    </span>}
                                </div>
                            )
                        }
                    </Popup>}
                    <div className={styles.Login}>
                        <span className={styles.LoginHeader}>User nickname: </span>
                        <span className={styles.LoginValue}>{this.props.profile.login}</span>
                    </div>
                </div>
            </div>
        );
    }
}


