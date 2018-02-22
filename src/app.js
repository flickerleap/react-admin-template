import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap';
import configureStore from './store/configureStore';
import Root from './Root';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('app'));