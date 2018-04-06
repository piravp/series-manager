import React from 'react';
import ReactDOM from 'react-dom';

// Custom components
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

// Styles
import './styles/styles.scss';


const store = configureStore();
console.log(store.getState());

ReactDOM.render(<AppRouter />, document.getElementById('app'));