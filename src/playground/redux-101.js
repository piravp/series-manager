import { createStore } from 'redux';


// Action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
        type: 'INCREMENT',
        incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET',
    reset: 0
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

// Reducers
// 1. Reducers are pure functions
// 2. Never change state or action

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
                count: state.count - action.decrementBy
            };
        case 'RESET':
            return {
                count: action.reset
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

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: -10 }));

store.dispatch(setCount({ count: 10 }));



