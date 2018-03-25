/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import ContactList from './components/contactList';
// import Contact from './components/contact';
import UserInfo from './components/userInfo';
// import ChatHistory from './components/сhatHistory';
// import EntryField from './components/entryField';
import styles from './index.css';


// @observer
// export default class App extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div className={styles.Page}><ContactList>
//                 <Contact name="123" date="data"
//                     message="text" unread={2}/>
//             </ContactList>
//             </div>
//         );
//     }
// }

@observer
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.Page}><UserInfo name="Билли" status="Online"
                mail="username" mailValue="@billy" title="Профиль"/>
            </div>
        );
    }
}

// @observer
// export default class App extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div className={styles.Page}>
//                 <ChatHistory />
//                 <EntryField />
//             </div>
//         );
//     }
// }
