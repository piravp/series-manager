import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Custom components
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addShow } from './actions/series'
import { setTextFilter } from './actions/filters'

// Styles
import './styles/styles.scss';

const store = configureStore();


store.dispatch(addShow({
    id: 3456,

    name: 'Person of Interest',
    vote_avg: '8.6',
    /*description: 'An ex CIA officer, John Reese is employed by the creator of a top secret government program.',*/
    first_aired: '2011-08-20',
    createdAt: 20
}));

const firstShow = store.dispatch(addShow({ 
    id:734, 

    name:'Blue Bloods', 
    vote_avg: '8.0',
    /*description:'New Yorks finest police offiers.',*/ 
    first_aired:'2013-09-19',
    createdAt: 1209 
}));

store.dispatch(addShow({ 
    id:13294, 

    name:'Homeland', 
    vote_avg: '7.8',
    /*description:'Hysterical woman.', */
    first_aired:'2012-09-21',
    createdAt: 599 
}));

//store.dispatch(setTextFilter({ text: 'Homeland' }));

setTimeout(() => store.dispatch(addShow({
    id:654, 

    name:'Herrens veier', 
    vote_avg: '8.7',
    /*description:'Hysterical woman.', */
    first_aired:'2017-01-19',
    createdAt: 2322 
})), 1000)

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

console.log(store.getState());

ReactDOM.render(jsx, document.getElementById('app'));