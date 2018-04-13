import React, { Component } from 'react';
import { PropTypes } from 'mobx-react';
import ReactPropTypes from 'prop-types';
import styles from './Chats.css';

export default class ContactsSearch extends Component {

    static propTypes = {
        chats: PropTypes.observableArray,
        children: ReactPropTypes.element
    };

    constructor(props) {
        super(props);
        this.state = { chats: this.props.chats };
    }

    filteredList(event) {
        const res = this.props.chats.filter(chat => {
            return chat.name.toLowerCase().search(event.target.value) !== -1;
        });

        this.setState({ chats: res });
    }

    render() {
        return (
            <div className={styles.Wrapper}>
                <div className={styles.Wrappers}>
                    <input placeholder="Поиск" className={styles.Input}
                        onChange={this.filteredList.bind(this)}/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
