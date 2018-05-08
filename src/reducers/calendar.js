const calendarReducerDefaultState = [];
const calendarReducer = (state = calendarReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_CALENDAR_EVENT':
            return [ ...state, action.data.event];
        case 'ADD_CALENDAR_LONG_EVENT':
            return [ ...state, action.data.event];
        case 'REMOVE_CALENDAR_EVENT':
            return state.filter(calendarEvent => calendarEvent.id !== action.id)
        default:
            return state;
    }
}

export default calendarReducer;