import React, { Component } from 'react';
import ReactPropTypes from 'prop-types';
import styles from './ChatSearchResults.css';

export default class ChatSearchResults extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        searchResult: ReactPropTypes.array
    };

    render() {
        console.log('RENDER CHAT SEARCH');
        console.log('this.props.searchResult: ');
        console.log(this.props.searchResult);

        const searchResult = this.props.searchResult.map(contact => (
            <a className={styles.Wrapper} onClick={this.props.onClick}>
                <img className={styles.Photo} src={contact.avatar} />
                <span className={styles.Name}>
                    {contact.login}
                </span>
            </a>
        ));
        console.log('searchResult: ');
        console.log(searchResult);
        if (searchResult.length > 0) {
            return (
                {searchResult}
            )
        }

        return (
            <div/>
        )
    }
}
