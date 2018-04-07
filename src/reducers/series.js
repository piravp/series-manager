// Series reducer
const seriesReducerDefaultState = [];
const seriesReducer = (state = seriesReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_SHOW':
            return [
                ...state, action.show
            ];
        case 'REMOVE_SHOW':
            return state.filter(show => show.id !== action.id);
        case 'REMOVE_ALL_SHOWS':
            return [];            ;
        default:
            return state;
    }
};

export default seriesReducer;