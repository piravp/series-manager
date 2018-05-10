// Import action
import { removeShowsWithCollection } from '../actions/series';

const collectionReducerDefaultState = ['Standard'];
const collectionReducer = (state = collectionReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_COLLECTION':
            // Does collection already exist?
            let index = state.findIndex(collection => collection.name == action.name);
            if(index == -1) {
                return [...state, action.name];
            }
            return [...state];
        case 'REMOVE_COLLECTION':
            action.asyncDispatch({ type: 'REMOVE_SHOWS_WITH_COLLECTION', value: action.name })
            console.log('action',action);        
            return state.filter(collection => collection !== action.name);
        default:
            return state;
    }
};

export default collectionReducer;