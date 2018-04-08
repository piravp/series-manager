// ADD_SHOW
export const addShow = ({ id, name, /*description,*/ vote_avg, first_aired, createdAt } = {}) => ({
    type: 'ADD_SHOW',
    show: {
        id,
        name,
        vote_avg,
        /*description,*/
        first_aired,
        createdAt
    }
});

// REMOVE_SHOW
export const removeShow = ({ id } = {}) => ({
    type: 'REMOVE_SHOW',
    id
});

// REMOVE_ALL_SHOWS
export const removeAllShows = () => ({
    type: 'REMOVE_ALL_SHOWS'
});

// GET_SHOW_DETAILS
export const getShowDetails = ({ id }) => ({
    type: 'GET_SHOW_DETAILS',
    id
});



