import { createStore } from 'redux';
import { filtersReducerDefaultState } from '../reducers/filters';
import rootReducer from '../reducers/root';
import { loadState, saveState } from '../utils/localStorage';
import throttle from 'lodash/throttle';

const configureStore = () => {

    console.log(loadState());
    
    const loadedState = loadState();
    let preloadedState = undefined;
    if(loadedState) {
        preloadedState = 
        {
            filters: filtersReducerDefaultState,
            series: loadedState.shows,
            timeline: loadedState.timeline,
            calendar: loadedState.calendar
        };
    }

    const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

    // Initialize store
    const store = createStore(rootReducer, preloadedState, storeEnhancer);

    // Save state every 2 s at most
    store.subscribe(throttle(() => {
        saveState({
            shows: store.getState().series,
            timeline: store.getState().timeline,
            calendar: store.getState().calendar 
        });
    }, 2000));

    return store;
}

// Create store
const store = configureStore();

export default store;