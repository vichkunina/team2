import React, { Component } from 'react';
import styles from './search.css';

export default class Search extends Component {
    constructor(props) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);
    }

    // onTextChanged(e) {
    //    this.props.filter(e.target.value);
    // }

    render() {
        return <div className={styles.Search}>
            <input placeholder="Search" /* onChange = {this.onTextChanged}*/
                className={styles.SearchInput}/></div>;
    }
}
