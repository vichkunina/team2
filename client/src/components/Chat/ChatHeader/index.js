import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../Contact/Avatar';
import styles from './index.css';
import Popup from 'reactjs-popup';

export default class ChatHeader extends Component {
    constructor(props) {
        super(props);
    }

    defaultStyleOverride = {
        width: '420px',
        padding: '0',
        'borderRadius': '4px'
    };

    static propTypes = {
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string,
        showProfile: PropTypes.func
    };

    render() {
        return (
            <div className={styles.Wrapper}>
                <button className={styles.BackButton}>&larr;</button>
                <Avatar src={this.props.avatar} size={43} />
                <a className={styles.Info}
                    onClick={ this.props.showProfile }>
                    <span className={styles.Name}>
                        {this.props.name}
                    </span>
                    <span className={styles.Status}>
                        {this.props.status}
                    </span>
                </a>
            </div>
        );
    }
}


