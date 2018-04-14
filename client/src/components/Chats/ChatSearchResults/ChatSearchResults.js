import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChatSearchResults extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        children: PropTypes.array
    };

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
