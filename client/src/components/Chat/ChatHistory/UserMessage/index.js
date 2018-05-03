import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OGAttachment from
    './OGAttachment';
import styles from './index.css';

export default class UserMessage extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        fromMe: PropTypes.bool.isRequired,
        isSent: PropTypes.bool,
        name: PropTypes.string,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        og: PropTypes.object,
        attachments: PropTypes.object
    };

    render() {
        const className =
            `${styles.Wrapper} ${this.props.fromMe ? styles.FromMe : styles.FromSomeone}`;

        return (
            <div className={className}>
                <span className={styles.Name}>{this.props.name}</span>
                <div className={styles.Body} dangerouslySetInnerHTML={{ __html: this.props.body }}/>
                {this.props.og &&
                    <OGAttachment
                        url={this.props.og.requestUrl}
                        title={this.props.og.data.ogTitle}
                        description={this.props.og.data.ogDescription}
                        image={this.props.og.data.ogImage.url} />}
                <time className={styles.Time}>
                    {this._formatDate(this.props.createdAt)}

                    {(this.props.fromMe && !this.props.isSent) &&
                        <span style={{ marginLeft: '10px' }}>
                            <i className="material-icons">schedule</i>
                        </span>
                    }
                </time>
                {this.props.attachments
                    ? <div className={styles.ImageWrapper}>
                        {this.props.attachments.map((attachment, index) => (
                            <img key={index} src={attachment} className={styles.Img}/>
                        ))}
                    </div>
                    : null}
            </div>
        );
    }

    _formatDate(createdAt) {
        if (!createdAt) {
            return;
        }

        createdAt = new Date(createdAt);

        return createdAt.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }
}
