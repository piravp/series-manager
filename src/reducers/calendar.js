const calendarReducerDefaultState = [];
const calendarReducer = (state = calendarReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_CALENDAR_EVENT':
            return [ ...state, action.data.event];
        case 'ADD_CALENDAR_LONG_EVENT':
            return [ ...state, action.data.event];
        default:
            return state;
    }
}

export default calendarReducer;