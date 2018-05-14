// SET_TEXT_FILTER
export const setTextFilter = ({ text = '' } = {}) => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE_ADDED_OLDEST_FIRST
export const sortByDateAddedOldestFirst = () => ({
    type: 'SORT_BY_DATE_ADDED_OLDEST_FIRST'
});

// SORT_BY_DATE_ADDED_NEWEST_FIRST
export const sortByDateAddedNewestFirst = () => ({
    type: 'SORT_BY_DATE_ADDED_NEWEST_FIRST'
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

// Filter which collections to show
// COLLECTION_FILTER
export const filterCollection = ({ collectionFilter } = {}) => ({
    type: 'FILTER_COLLECTION',
    collectionFilter
});