/* eslint-disable no-invalid-this*/
import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.css';
import { PropTypes } from 'mobx-react';
import Popup from 'reactjs-popup';


@observer
export default class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
    }

    static propTypes = {
        chatPreviewState: PropTypes.observableObject
    };

    onDrop = (accepted) => {
        const files = {};
        accepted.forEach((el, index) => {
            files[index] = el;
        });
        this.props.chatPreviewState.change(files);
    };

    changeHandler(event) {
        this.props.chatPreviewState.change(event.currentTarget.files);
        event.currentTarget.value = '';
    }

    renderPreview() {
        const attachments = this.props.chatPreviewState.attachments;
        if (!attachments) {
            return (<React.Fragment />);
        }

        return (
            <section className={styles.PreviewImgList}>
                {this.props.chatPreviewState.error &&
                    <Popup
                        open={true}
                        modal
                        closeOnEscape
                        contentStyle={this.defaultStyleOverride}
                        closeOnDocumentClick
                        onClose={this.props.chatPreviewState.clearError
                            .bind(this.props.chatPreviewState)}>
                        {
                            (close) => (
                                <div className={styles.PopupContainer}>
                                    <span className={styles.ErrorMessage}>
                                        {this.props.chatPreviewState.error}
                                        { <span className={styles.PopupClose} onClick={close}>
                                            ❌
                                        </span>}
                                    </span>
                                </div>
                            )
                        }
                    </Popup>}
                {attachments.map((url, index) =>
                    <div key={index} className={styles.PreviewImg}>
                        {url === 'loading'
                            ? <div className={styles.Loader}/>
                            : <img className={styles.Img} src={url}/>}
                        <button type="button" key={index} className={`${styles.CloseButton}
                            ${styles.Button}`}
                        onClick={this.props.chatPreviewState
                            .remove.bind(this.props.chatPreviewState, index)}>
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                )}
            </section>
        );
    }

    render() {

        return (
            <React.Fragment>
                {this.renderPreview()}
                <div className = {`${styles.ImageButton} ${styles.Button}`}>
                    <label>
                        <input type="file" onChange={this.changeHandler}
                            accept="image/*" multiple className={styles.Upload} />
                        <i className="material-icons">image</i>
                    </label>
                </div>
            </ React.Fragment>
        );
    }
}
