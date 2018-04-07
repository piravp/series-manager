// Filter reducer
const filtersReducerDefaultState = {
    text: '',
    "sortBy": 'name_ascending'
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE_ASCENDING':
            return {
                ...state, 
                sortBy: 'date_ascending'
            };
        case 'SORT_BY_DATE_DESCENDING':
            return {
                ...state, 
                sortBy: 'date_descending'
            };
        case 'SORT_BY_NAME_ASCENDING':
            return {
                ...state, 
                sortBy: 'name_ascending'
            };
        case 'SORT_BY_NAME_DESCENDING':
            return {
                ...state, 
                sortBy: 'name_descending'
            };
        case 'SORT_BY_RATING_ASCENDING':
            return {
                ...state, 
                sortBy: 'rating_ascending'
            };
        case 'SORT_BY_RATING_DESCENDING':
            return {
                ...state, 
                sortBy: 'rating_descending'
            };
        default:
            return state;
    }
}; 

export default filtersReducer;