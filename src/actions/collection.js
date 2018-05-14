// ADD_COLLECTION
export const addCollection = ({ name } = {}) => ({
    type: 'ADD_COLLECTION',
    name
});


// REMOVE_COLLECTION
export const removeCollection = ({ name } = {}) => ({
    type: 'REMOVE_COLLECTION',
    name
});
