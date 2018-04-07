// SET_TEXT_FILTER
export const setTextFilter = ({ text = '' } = {}) => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE_ASCENDING
export const sortByDateAscending = () => ({
    type: 'SORT_BY_DATE_ASCENDING'
});

// SORT_BY_DATE_DESCENDING
export const sortByDateDescending = () => ({
    type: 'SORT_BY_DATE_DESCENDING'
});

// SORT_BY_NAME_ASCENDING
export const sortByNameAscending = () => ({
    type: 'SORT_BY_NAME_ASCENDING'
});

// SORT_BY_NAME_ASCENDING
export const sortByNameDescending = () => ({
    type: 'SORT_BY_NAME_DESCENDING'
});


// SORT_BY_RATING_ASCENDING
export const sortByRatingAscending = () => ({
    type: 'SORT_BY_RATING_ASCENDING'
});

// SORT_BY_RATING_ASCENDING
export const sortByRatingDescending = () => ({
    type: 'SORT_BY_RATING_DESCENDING'
});