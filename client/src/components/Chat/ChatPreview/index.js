/* eslint-disable no-invalid-this*/
import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.css';
import { PropTypes } from 'mobx-react';


@observer
export default class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
    }

    static propTypes = {
        chatPreviewState: PropTypes.observableObject
    };

    changeHandler(event) {
        this.props.chatPreviewState.change(event.currentTarget.files);
    }

    renderPreview() {
        const attachments = this.props.chatPreviewState.attachments;
        if (!attachments) {
            return (<React.Fragment />);
        }

        return (
            <section className={styles.PreviewImgList}>
                {attachments.map((url, index) =>
                    <div key={index} className={styles.PreviewImg}>
                        <img className={styles.Img} src={url}/>
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
