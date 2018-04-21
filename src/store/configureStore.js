import { createStore } from 'redux';
import { filtersReducerDefaultState } from '../reducers/filters';
import rootReducer from '../reducers/root';
import { loadState, saveState } from '../utils/localStorage';
import throttle from 'lodash/throttle';

const configureStore = () => {

    const preloadedState = {
        filters: filtersReducerDefaultState,
        series: loadState()
    };

    const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

    // Initialize store
    const store = createStore(rootReducer, preloadedState, storeEnhancer);

    // Save state every 2 s
    store.subscribe(throttle(() => {
        saveState( store.getState().series );
    }, 2000));

    return store;
}

// Create store
const store = configureStore();

export default store;