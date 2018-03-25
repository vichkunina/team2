import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ContactList from './components/contactList';
import Contact from './components/contact';

@observer
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div><ContactList>
                <Contact name="123" date="data"
                    message="text" unread={2}/>
            </ContactList>
            </div>
        );
    }
}
