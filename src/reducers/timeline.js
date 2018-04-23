// Series reducer
const timelineReducerDefaultState = [];
const timelineReducer = (state = timelineReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_SHOW_TIMELINE':
            return [...state, action.info];
        case 'REMOVE_SHOW_TIMELINE':
            return [...state, action.info];
        case 'REMOVE_ALL_SHOWS_TIMELINE':
            return [...state, action.info];
        default:
            return state;
    }
};

export default timelineReducer;
