/* eslint-disable complexity*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OGAttachment from
    './OGAttachment';
import styles from './index.css';
import Popup from 'reactjs-popup';
import { observer, inject } from 'mobx-react';

@inject('chatState') @observer
export default class UserMessage extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        chatState: PropTypes.object,
        fromMe: PropTypes.bool.isRequired,
        isSent: PropTypes.bool,
        name: PropTypes.string,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        og: PropTypes.object,
        attachments: PropTypes.object
    };

    onClick(e) {
        this.props.chatState.fullSizeImg = true;
        this.props.chatState.file = e.target.getAttribute('src');
    }

    render() {
        const className =
            `${styles.Wrapper} ${this.props.fromMe ? styles.FromMe : styles.FromSomeone}`;

        return (
            <div className={className}>
                {this.props.chatState.fullSizeImg &&
                <Popup
                    open={true}
                    modal
                    closeOnEscape
                    closeOnDocumentClick
                    onClose={this.props.chatState.changeFullSizeImg
                        .bind(this.props.chatState)}>

                    {
                        (close) => (
                            <div className={styles.PopupContainer}>
                                <span className={styles.ErrorMessage}>
                                    <img src={this.props.chatState.file} className={styles.ImgBig}/>
                                    { <span className={styles.PopupClose}
                                        onClick={close}>
                                    ❌
                                    </span>}
                                </span>
                            </div>
                        )
                    }
                </Popup>}
                <span className={styles.Name}>{this.props.name}</span>
                <div className={styles.Body} dangerouslySetInnerHTML={{ __html: this.props.body }}/>
                {this.props.og &&
                    <OGAttachment
                        url={this.props.og.requestUrl}
                        title={this.props.og.data.ogTitle}
                        description={this.props.og.data.ogDescription}
                        image={this.props.og.data.ogImage} />}
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
                            <img key={index} src={attachment}
                                className={styles.Img}
                                onClick={this.onClick.bind(this)}/>
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
