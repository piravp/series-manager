import moment from 'moment';
import uuid4 from 'uuid';

// ADD_SHOW
export const addShowToTimeline = ({ id, name } = {}) => ({
    type: 'ADD_SHOW_TIMELINE',
    info: {
        id: uuid4(),
        name,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'add_show'
    }
});

// REMOVE_SHOW
export const removeShowTimeline = ({ id, name } = {}) => ({
    type: 'REMOVE_SHOW_TIMELINE',
    info: {
        id: uuid4(),
        name,
        removedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'remove_show'
    }
});



// REMOVE_ALL_SHOWS
export const removeAllShowsFromTimeline = () => ({
    type: 'REMOVE_ALL_SHOWS_TIMELINE',
    info: {
        id: uuid4(),
        removedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'remove_all_shows'
    }
});


// // REMOVE_TIMELINE_ITEM
// export const removeTimelineItem = ({ id } = {}) => ({
//     type: 'REMOVE_TIMELINE_ITEM',
//     id
// });

// Delete all events from the timeline
// REMOVE_EVERY_TIMELINE_ITEMS
export const removeEveryTimelineItem = () => ({
    type: 'REMOVE_EVERY_TIMELINE_ITEM'
});


// ADD_COLLECTION_TIMELINE
export const addCollectionToTimeline = ({ id, name } = {}) => ({
    type: 'ADD_COLLECTION_TIMELINE',
    info: {
        id: uuid4(),
        name,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'add_collection'
    }
});


// REMOVE_COLLECTION_TIMELINE
export const removeCollectionTimeline = ({ name } = {}) => ({
    type: 'REMOVE_COLLECTION_TIMELINE',
    info: {
        id: uuid4(),
        name,
        removedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: 'remove_collection'
    }
});