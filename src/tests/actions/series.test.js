import { addShow, removeShow, removeAllShows, getShowDetails } from '../../actions/series';

// Test removeShow action
test('Should setup removeShow action object', () => {
    const action = removeShow({ id: 1411 });

    expect(action).toEqual({ 
        type: 'REMOVE_SHOW', id: 1411 
    });
});

// Test removeAllShow action
test('Should setup removeAllShows action object', () => {
    const action = removeAllShows();

    expect(action).toEqual({ 
        type: 'REMOVE_ALL_SHOWS'
    });
});


// Test getShowDetails action
test('Should setup getShowDetails action object', () => {
    const action = getShowDetails({ id: 34223 });

    expect(action).toEqual({ 
        type: 'GET_SHOW_DETAILS', id: 34223 
    });
});

// Test addShow action
test('Should setup addShow action object', () => {
    const addShowObject = {
        id: 34223,
        name: 'Homeland',
        description: '',
        vote_avg: 7.8,
        first_aired: '2011-08-22',
        createdAt: 978,
        poster_path: 'sdjlkajsdajskdj32j.jpg',
        backdrop_path: '03kjrf02jdfj20ifj.png'
    }
    const action = addShow(addShowObject);

    expect(action).toEqual({
        type: 'ADD_SHOW',
        show: {
            ...addShowObject 
        }
    });
});


// Test addShow action, when empty
test('Should setup addShow action object with default values', () => {
    const action = addShow({});

    expect(action).toEqual({ 
        type: 'ADD_SHOW', 
        show: {
            id: undefined,
            name: undefined,
            description: undefined,
            vote_avg: undefined,
            first_aired: undefined,
            createdAt: undefined,
            poster_path: null,
            backdrop_path: null
        }
    });
});