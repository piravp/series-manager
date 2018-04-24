import moment from 'moment';

// ADD_SHOW
export const addShowToTimeline = ({ id, name } = {}) => ({
    type: 'ADD_SHOW_TIMELINE',
    info: {
        id,
        name,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'add_show'
    }
});

// REMOVE_SHOW
export const removeShowTimeline = ({ id, name } = {}) => ({
    type: 'REMOVE_SHOW_TIMELINE',
    info: {
        id,
        name,
        removedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'remove_show'
    }
});



// REMOVE_ALL_SHOWS
export const removeAllShowsFromTimeline = () => ({
    type: 'REMOVE_ALL_SHOWS_TIMELINE',
    info: {
        removedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'remove_all_shows'
    }
});