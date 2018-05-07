import { combineReducers } from 'redux';
import seriesReducer from '../reducers/series';
import { filtersReducer } from '../reducers/filters';
import timelineReducer from '../reducers/timeline';
import calendarReducer from '../reducers/calendar';

const rootReducer = combineReducers({
    series: seriesReducer,
    filters: filtersReducer,
    timeline: timelineReducer,
    calendar: calendarReducer
});

export default rootReducer;