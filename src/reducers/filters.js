// Filter reducer
const filtersReducerDefaultState = {
    text: '',
    "sortBy": 'name'
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state, 
                sortBy: 'date'
            };
        case 'SORT_BY_NAME':
            return {
                ...state, 
                sortBy: 'name'
            };
        default:
            return state;
    }
};

export default filtersReducer;