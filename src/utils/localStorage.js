export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Do nothing
    }
};

export const clearStorage = () => {
    try {
        localStorage.removeItem('state');
    } catch (err) {
        // Do nothing
    }
};

export const getAPIKey = () => {
    try {
        return localStorage.getItem('api_key');
    } catch (err) {
        // Do nothing
    }
};

export const setAPIKey = (api_key) => {
    try {
        localStorage.setItem('api_key', api_key);
    } catch (err) {
        // Do nothing
    }
};