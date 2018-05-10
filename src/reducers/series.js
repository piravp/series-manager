// Series reducer
const seriesReducerDefaultState = [];
const seriesReducer = (state = seriesReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_SHOW':
            // Does show already exist?
            let index = state.findIndex(show => show.id == action.show.id);
            if(index == -1) {
                return [...state, action.show];
            }
            return [...state];
        case 'REMOVE_SHOW':
            return state.filter(show => show.id !== action.id);
        case 'REMOVE_ALL_SHOWS':
            return [];
        case 'REMOVE_SHOWS_WITH_COLLECTION':
            return state.filter(show => show.collection !== action.value)
        default:
            return state;
    }
};

export default seriesReducer;

