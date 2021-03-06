import { combineReducers } from 'redux';
import seriesReducer from '../reducers/series';
import { filtersReducer } from '../reducers/filters';
import timelineReducer from '../reducers/timeline';
import calendarReducer from '../reducers/calendar';
import settingsReducer from '../reducers/settings';
import collectionReducer from '../reducers/collection';


const rootReducer = combineReducers({
    series: seriesReducer,
    filters: filtersReducer,
    timeline: timelineReducer,
    calendar: calendarReducer,
    settings: settingsReducer,
    collection: collectionReducer
});

export default rootReducer;