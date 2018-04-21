import { 
    setTextFilter,
    sortByDateAscending,
    sortByDateDescending,
    sortByNameAscending,
    sortByNameDescending,
    sortByRatingAscending,
    sortByRatingDescending  
} from '../../actions/filters';


// setTextFilter, non-empty string
test('Should setup setTextFilter object for non-empty string', () => {
    const action = setTextFilter({ text: 'human target'});

    expect(action).toEqual({ 
        type: 'SET_TEXT_FILTER',
        text: 'human target'
     })
});

// setTextFilter, empty object
test('Should setup setTextFilter object for empty string', () => {
    const action = setTextFilter();

    expect(action).toEqual({ 
        type: 'SET_TEXT_FILTER',
        text: ''
     })
});

// --------------------- DATE ----------------------
// sortByDateAscending
test('Should setup sortByDateAscending object', () => {
    const action = sortByDateAscending();

    expect(action).toEqual({ type: 'SORT_BY_DATE_ASCENDING' })
});

// sortByDateDescending
test('Should setup sortByDateDescending object', () => {
    const action = sortByDateDescending();

    expect(action).toEqual({ type: 'SORT_BY_DATE_DESCENDING' })
});

// --------------------- NAME ----------------------
// sortByNameAscending
test('Should setup sortByNameAscending object', () => {
    const action = sortByNameAscending();

    expect(action).toEqual({ type: 'SORT_BY_NAME_ASCENDING' })
});

// sortByNameDescending
test('Should setup sortByNameDescending object', () => {
    const action = sortByNameDescending();

    expect(action).toEqual({ type: 'SORT_BY_NAME_DESCENDING' })
});

// --------------------- RATING ----------------------
// sortByRatingAscending
test('Should setup sortByRatingAscending object', () => {
    const action = sortByRatingAscending();

    expect(action).toEqual({ type: 'SORT_BY_RATING_ASCENDING' })
});

// sortByRatingDescending
test('Should setup sortByRatingDescending object', () => {
    const action = sortByRatingDescending();

    expect(action).toEqual({ type: 'SORT_BY_RATING_DESCENDING' })
});