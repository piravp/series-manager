import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Custom components
import AppRouter from './routers/AppRouter';
import store from './store/configureStore';
import { addShow } from './actions/series'
import { setTextFilter } from './actions/filters'

// Styles
import './styles/styles.scss';


// store.dispatch(addShow({
//     id: 1411,
//     name: 'Person of Interest',
//     vote_avg: '8.6',
//     description: 'Person of Interest follows former CIA paramilitary operative, John Reese, who is presumed dead and teams up with reclusive billionaire Finch to prevent violent crimes in New York City by initiating their own type of justice. With the special training that Reese has had in Covert Operations and Finch\'s genius software inventing mind, the two are a perfect match for the job that they have to complete. With the help of surveillance equipment, they work "outside the law" and get the right criminal behind bars.',
//     first_aired: '2011-08-20',
//     createdAt: '2018-05-05 19:57:14',
//     poster_path: '/7XFZOcYiBuFDrhqGrEoawF0T30l.jpg',
//     backdrop_path: '/wJ1D6uvKmc5sqqdYfyNmWMMxS22.jpg',
//     collection: 'Watched'
// }));

// const firstShow = store.dispatch(addShow({ 
//     id: 32692, 
//     name:'Blue Bloods', 
//     vote_avg: '8.0',
//     description:'A drama about a multi-generational family of cops dedicated to New York City law enforcement. Frank Reagan is the New York Police Commissioner and heads both the police force and the Reagan brood. He runs his department as diplomatically as he runs his family, even when dealing with the politics that plagued his unapologetically bold father, Henry, during his stint as Chief.',
//     first_aired:'2013-09-19',
//     createdAt: '2018-05-09 22:17:54',
//     poster_path: '/4xWYZ0q6RlKnStWJlpz535uElfd.jpg',
//     backdrop_path: '/yNXSE13oAeFiXeIS7dPq4suQRf5.jpg',
//     collection: 'Yet to watch'
// }));

// store.dispatch(addShow({ 
//     id:1407, 
//     name:'Homeland', 
//     vote_avg: '7.8',
//     description:'CIA officer Carrie Mathison is tops in her field despite being bipolar, which makes her volatile and unpredictable. With the help of her long-time mentor Saul Berenson, Carrie fearlessly risks everything, including her personal well-being and even sanity, at every turn.', 
//     first_aired:'2012-09-21',
//     createdAt: '2018-03-17 17:23:00',
//     poster_path: '/lT8o38ubu9uzcjZbkDtwsVizDeQ.jpg',
//     backdrop_path: '/hTxfw4af6EizpLM7tHKtoSlbdnu.jpg',
//     collection: 'Yet to watch'
// }));



// setTimeout(() => store.dispatch(addShow({
//     id:6514, 

//     name:'Herrens veier', 
//     vote_avg: '8.7',
//     /*description:'Hysterical woman.', */
//     first_aired:'2017-01-19',
//     createdAt: 2322 
// })), 1000)

const app = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);


ReactDOM.render(app, document.getElementById('app'));