const settingsReducerDefaultState = {
    visible: true
};
const settingsReducer = (state = settingsReducerDefaultState, action) => {
    switch(action.type){
        case 'SETTINGS_CALENDAR_SHOW_TOOLBAR':
            return {
                ...state,
                visible: action.visible
            };
        default:
            return state;
    }
};


export default settingsReducer;