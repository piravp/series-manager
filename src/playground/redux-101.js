import { createStore } from 'redux';


// Action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
        type: 'INCREMENT',
        incrementBy
});


// Similar to setState
// We set the default state using ={count:0}
const store = createStore ((state = { count: 0 }, action) => {
    switch (action.type){
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            };
        default:
            return state;
    }
    return state;
});


const unsubscribe = store.subscribe(() => {
    // What to run every time the state changes
    console.log(store.getState());
});



// Actions are just an object that gents sent to the store

//-- Increment the count
// Dispatch sends the Action object to the store
// store.dispatch({
//     type: 'INCREMENT',   // Convenction to use capital letter for the action type
//     incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

store.dispatch({
    type: 'RESET'   // Convenction to use capital letter for the action type
});

store.dispatch({
    type: 'DECREMENT'   // Convenction to use capital letter for the action type
});

store.dispatch({
    type: 'SET',
    count: 10
});



