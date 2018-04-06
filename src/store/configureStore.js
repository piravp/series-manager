import { createStore, combineReducers } from 'redux';
import seriesReducer from '../reducers/series';
import filtersReducer from '../reducers/filters';


// Store creation


export default () => {
    // Store creation
    const store = createStore( 
    // Takes in an object with key-value pair with key:root reducer name
    // and value:reducer which is supposed to manage that
    combineReducers({ 
        series: seriesReducer,
        filter: filtersReducer 
    }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}