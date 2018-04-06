import { createStore, combineReducers } from 'redux';

// ADD_SHOW
const addShow = ({ id, name, description, first_aired, createdAt } = {}) => ({
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
const removeShow = ({ id } = {}) => ({
    type: 'REMOVE_SHOW',
    id
});

// SET_TEXT_FILTER
const setTextFilter = ({ text = '' } = {}) => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});
// SORT_BY_NAME
const sortByName = () => ({
    type: 'SORT_BY_NAME'
});
// SET

const demoState = {
    series: [{
        id: '3456',
        name: 'Person of Interest',
        description: 'An ex CIA officer, John Reese is employed by the creator of a top secret government program.',
        'first_aired': '2011-08-20'
    }],
    filters: { 
        text: '',
        sortBy: 'name',  // date, name, popularity
    }
};

// Series reducer
const seriesReducerDefaultState = [];
const seriesReducer = (state = seriesReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_SHOW':
            return [
                ...state, action.show
            ];
        case 'REMOVE_SHOW':
            return state.filter(show => show.id !== action.id);
        default:
            return state;
    }
};

// Filter reducer
const filtersReducerDefaultState = {
    text: '',
    "sortBy": 'name'
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state, 
                sortBy: 'date'
            };
        case 'SORT_BY_NAME':
            return {
                ...state, 
                sortBy: 'name'
            };
        default:
            return state;
    }
};

// Get visible series
const getVisibleSeries = (series, { text, sortBy }) => {
    return series.filter((show) => {
        const textMatch = show.name.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            // Synkende rekkefølge (nyest først)
            console.log(a.createdAt < b.createdAt)
            return a.createdAt < b.createdAt ? 1 : -1
        } 
        else if (sortBy === 'name'){
            // Stigende rekkefølge
            //console.log(a.name > b.name)
            //return a.name.localeCompare(b.name);
            return a.name > b.name;
        }
    });
};


// Store creation
const store = createStore( 
    // Takes in an object with key-value pair with key:root reducer name
    // and value:reducer which is supposed to manage that
    combineReducers({ 
        series: seriesReducer,
        filter: filtersReducer 
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


store.subscribe(() => {
    const state = store.getState();
    const visibleSeries = getVisibleSeries(state.series, state.filter);
    console.log(visibleSeries);
});



// // Dispatch actions to the series store
store.dispatch(addShow({
    id: 3456,
    name: 'Person of Interest',
    description: 'An ex CIA officer, John Reese is employed by the creator of a top secret government program.',
    first_aired: '2011-08-20',
    createdAt: 20
}));

const firstShow = store.dispatch(addShow({ 
    id:734, 
    name:'Blue Bloods', 
    description:'New Yorks finest police offiers.', 
    first_aired:'2013-09-19',
    createdAt: 1209 
}));

store.dispatch(addShow({ 
    id:13294, 
    name:'Homeland', 
    description:'Hysterical woman.', 
    first_aired:'2012-09-21',
    createdAt: 599 
}));
//store.dispatch(removeShow({ id: firstShow.show.id }))


// // Dispatch actions to the filter store
//store.dispatch(setTextFilter({ text: 'person' }));
// store.dispatch(setTextFilter());
//store.dispatch(sortByDate());
store.dispatch(sortByName());



