import React, { Component } from 'react';

export default class ChatSearchResults extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('RENDER CHAT SEARCH');
        console.log('this.props.searchResult: ');
        console.log(this.props.searchResult);

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
