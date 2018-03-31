import React from 'react';
import ReactDOM from 'react-dom';

import Store from './components/Store/Store';
import App from './components/App/App';

const store = new Store();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
