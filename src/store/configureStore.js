import { createStore, combineReducers } from 'redux';
import seriesReducer from '../reducers/series';
import { filtersReducer, filtersReducerDefaultState } from '../reducers/filters';
import { loadState, saveState } from '../utils/localStorage';


export default () => {

    // Store creation
    const store = createStore( 
    // Takes in an object with key-value pair with key:root reducer name
    // and value:reducer which is supposed to manage that
    combineReducers({ 
        series: seriesReducer,
        filters: filtersReducer 
    }),
    {
        filters: filtersReducerDefaultState,
        series: loadState()
    }
    ,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    store.subscribe(() => {
        saveState( store.getState().series );
    });

    return store;
}