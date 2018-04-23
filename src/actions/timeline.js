// ADD_SHOW
export const addShowToTimeline = ({ id, name, createdAt } = {}) => ({
    type: 'ADD_SHOW_TIMELINE',
    info: {
        id,
        name,
        createdAt,
        type: 'add_show'
    }
});

// REMOVE_SHOW
export const removeShowTimeline = ({ id, name, removedAt } = {}) => ({
    type: 'REMOVE_SHOW_TIMELINE',
    info: {
        id,
        name,
        removedAt,
        type: 'remove_show'
    }
});



// REMOVE_ALL_SHOWS
export const removeAllShowsFromTimeline = ({ removed }) => ({
    type: 'REMOVE_ALL_SHOWS_TIMELINE',
    removed
});