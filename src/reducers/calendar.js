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
//             let titleExists = state.findIndex(calendarLongEvent => calendarLongEvent.title == action.data.event.title);
//             if(titleExists == -1) {
//                 let idExists = state.findIndex(calendarLongEvent => calendarLongEvent.id == action.data.event.id);
//                 // Event is recurring, let it pass
//                 if (idExists !== -1){
//                     return [ ...state, action.data.event];
//                 }
// //                return [ ...state];
//             }
            return [ ...state, action.data.event];
        case 'REMOVE_CALENDAR_EVENT':
            return state.filter(calendarEvent => calendarEvent.id !== action.id)
        default:
            return state;
    }
}

export default calendarReducer;