// ADD_SHOW
export const addShow = ({ id, name, description, first_aired, createdAt } = {}) => ({
    type: 'ADD_SHOW',
    show: {
        id,
        name,
        description,
        first_aired,
        createdAt
    }
});

// REMOVE_SHOW
export const removeShow = ({ id } = {}) => ({
    type: 'REMOVE_SHOW',
    id
});

