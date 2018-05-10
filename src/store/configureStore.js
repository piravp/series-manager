import { createStore, applyMiddleware, compose } from 'redux';
import { filtersReducerDefaultState } from '../reducers/filters';
import rootReducer from '../reducers/root';
import { loadState, saveState } from '../utils/localStorage';
import throttle from 'lodash/throttle';
import asyncDispatchMiddleware from '../utils/middlewares';

const configureStore = () => {
    
    const loadedState = loadState();
    let preloadedState = undefined;
    if(loadedState) {
        preloadedState = 
        {
            filters: filtersReducerDefaultState,
            series: loadedState.shows,
            timeline: loadedState.timeline,
            calendar: loadedState.calendar,
            collection: loadedState.collection
        };
    }

    const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

    const middlewares = compose(applyMiddleware(asyncDispatchMiddleware), storeEnhancer);

    // Initialize store
    const store = createStore(rootReducer, preloadedState, middlewares);

    // Save state every 2 s at most
    store.subscribe(throttle(() => {
        saveState({
            shows: store.getState().series,
            timeline: store.getState().timeline,
            calendar: store.getState().calendar ,
            collection: store.getState().collection
        });
    }, 2000));

    return store;
}

// Create store
const store = configureStore();

export default store;