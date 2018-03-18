import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Store';
import App from './App';

const store = new Store();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
