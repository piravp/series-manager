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


// REMOVE_TIMELINE_ITEM
export const removeTimelineItem = ({ id } = {}) => ({
    type: 'REMOVE_TIMELINE_ITEM',
    id
});

// REMOVE_EVERY_TIMELINE_ITEMS
export const removeEveryTimelineItem = () => ({
    type: 'REMOVE_EVERY_TIMELINE_ITEM'
});


// ADD_COLLECTION_TIMELINE
export const addCollectionToTimeline = ({ id, name } = {}) => ({
    type: 'ADD_COLLECTION_TIMELINE',
    info: {
        id,
        name,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'add_collection'
    }
});


// REMOVE_COLLECTION_TIMELINE
export const removeCollectionTimeline = ({ name } = {}) => ({
    type: 'REMOVE_COLLECTION_TIMELINE',
    info: {
        name,
        removedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'remove_collection'
    }
});