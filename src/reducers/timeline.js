// Series reducer
const timelineReducerDefaultState = [];
const timelineReducer = (state = timelineReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_SHOW_TIMELINE':
            // Does show already exist?
            let index = state.findIndex(timelineItem => timelineItem.name == action.info.name);
            // Doesn't exist
            if(index == -1) {
                return [...state, action.info];
            }
            return [...state];
        case 'REMOVE_SHOW_TIMELINE':
            return [...state, action.info];
        case 'REMOVE_ALL_SHOWS_TIMELINE':
            return [...state, action.info];
        case 'REMOVE_TIMELINE_ITEM':
            return state.filter(timelineItem => timelineItem.id !== action.id);
        case 'REMOVE_EVERY_TIMELINE_ITEM':
            return [];
        default:
            return state;
    }
};

export default timelineReducer;
