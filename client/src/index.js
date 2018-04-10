import React from 'react';
import ReactDOM from 'react-dom';

import Store from './components/Store/Store';
// import App from './components/App/App';
import App from './tests/apollo-app/apolloApp';

const store = new Store();

if (!(sessionStorage && sessionStorage.getItem('auth'))) {
    sessionStorage.setItem('auth', 1);
    window.location = 'http://localhost:8080/login';
}

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
