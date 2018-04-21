import { combineReducers } from 'redux';
import seriesReducer from '../reducers/series';
import { filtersReducer } from '../reducers/filters';

const rootReducer = combineReducers({
    series: seriesReducer,
    filters: filtersReducer
});

export default rootReducer;