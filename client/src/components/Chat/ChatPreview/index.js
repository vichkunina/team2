/* eslint-disable no-invalid-this*/
import FilePreview from 'react-preview-file';
import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.css';


@observer
export default class Preview extends React.Component {

    onPreviewChange = event => {
        const { currentTarget: { files } } = event;
        const allFiles = {};
        Object.assign(allFiles, this && this.state && this.state.files);
        for (let file of files) {
            const len = Object.keys(allFiles);
            allFiles[`${Number(len) + 1}`] = file;
        }
        this.setState({ files: allFiles });
    }

    handleDeleteElement = (e) => {
        const item = e._targetInst._debugOwner.key;
        const { files } = this.state;
        const fileList = Object.assign({}, files);
        delete fileList[item];
        this.setState({ files: fileList });
        this.renderPreview();
    };

    renderPreview() {
        const { files } = this.state || {};
        if (!files) {
            return (<React.Fragment />);
        }

        const keys = Object.keys(files);

        return (
            <section className={styles.PreviewImgList}>
                {keys.map(key =>
                    <FilePreview key={key} file={files[key] }>
                        {(preview) =>
                            <div className={styles.PreviewImg}>
                                <img className={styles.Img} src={preview}/>
                                <button type="button" key={key} className={`${styles.CloseButton}
                                    ${styles.Button}`}
                                onClick={this.handleDeleteElement}>
                                    <i className="material-icons">close</i>
                                </button>
                            </div>
                        }
                    </FilePreview>
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
                        <input type="file" onChange={this.onPreviewChange}
                            accept="image/*" multiple className={styles.Upload} />
                        <i className="material-icons">image</i>
                    </label>
                </div>
            </ React.Fragment>
        );
    }
}
