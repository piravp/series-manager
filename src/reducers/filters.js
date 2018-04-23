// Filter reducer
export const filtersReducerDefaultState = {
    text: '',
    "sortBy": 'date_added_newest_first'
};
export const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE_ADDED_OLDEST_FIRST':
            return {
                ...state, 
                sortBy: 'date_added_oldest_first'
            };
        case 'SORT_BY_DATE_ADDED_NEWEST_FIRST':
            return {
                ...state, 
                sortBy: 'date_added_newest_first'
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

