import { combineReducers } from 'redux';
import seriesReducer from '../reducers/series';
import { filtersReducer } from '../reducers/filters';
import timelineReducer from '../reducers/timeline';

const rootReducer = combineReducers({
    series: seriesReducer,
    filters: filtersReducer,
    timeline: timelineReducer
});

export default rootReducer;