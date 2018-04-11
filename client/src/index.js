import React from 'react';
import ReactDOM from 'react-dom';

// import App from './components/App/App';
import App from './tests/apollo-app/apolloApp';

/* if (!(sessionStorage && sessionStorage.getItem('auth'))) {
    sessionStorage.setItem('auth', 1);
    window.location = 'http://localhost:8080/login';
}*/

ReactDOM.render(<App/>, document.getElementById('root'));
