import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default class OGAttachment extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        image: PropTypes.string.isRequired
    }

    render() {
        return (
            <a href={this.props.url} className={styles.Wrapper}>
                <div className={styles.Info}>
                    <span className={styles.Title}>{this.props.title}</span>
                    {
                        this.props.description
                            ? <span className={styles.Description}>{this.props.description}</span>
                            : null
                    }
                </div>
            </a>
        );
    }
}
