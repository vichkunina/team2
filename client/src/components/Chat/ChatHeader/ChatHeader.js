import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ChatHeader.css';

export default class ChatHeader extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        photoURL: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string,
        transistFromChatToContacts: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className={styles.Wrapper}>
                <button className={styles.BackButton}
                    onClick={ this.props.transistFromChatToContacts }>&larr;</button>
                <img className={styles.Photo} src={this.props.photoURL} />
                <div className={styles.Info}>
                    <span className={styles.Name}>
                        {this.props.name}
                    </span>
                    <span className={styles.Status}>
                        {this.props.status}
                    </span>
                </div>
            </div>
        );
    }
}


