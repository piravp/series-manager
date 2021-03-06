import moment from 'moment';

// ADD_SHOW
export const addShow = ({ id, name, description, vote_avg, first_aired, poster_path=null, backdrop_path=null, collection } = {}) => ({
    type: 'ADD_SHOW',
    show: {
        id,
        name,
        vote_avg,
        description,
        first_aired,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        poster_path,
        backdrop_path,
        collection
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

// Remove any show with the provided collection name
// REMOVE_SHOWS_WITH_COLLECTION
export const removeShowsWithCollection = ({ collectionName }) => ({
    type: 'REMOVE_SHOWS_WITH_COLLECTION',
    collectionName
});

