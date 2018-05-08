const calendarReducerDefaultState = [];
const calendarReducer = (state = calendarReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_CALENDAR_EVENT':
            // Does show already exist in calendar?
            let index = state.findIndex(calendarEvent => calendarEvent.title == action.data.event.title);
            if(index == -1) {
                return [ ...state, action.data.event];
            }
            return [ ...state];
        case 'ADD_CALENDAR_LONG_EVENT':
            let indexLong = state.findIndex(calendarLongEvent => calendarLongEvent.title == action.data.event.title);
            if(indexLong == -1) {
                return [ ...state, action.data.event];
            }
            return [ ...state];
        case 'REMOVE_CALENDAR_EVENT':
            return state.filter(calendarEvent => calendarEvent.id !== action.id)
        default:
            return state;
    }
}

export default calendarReducer;