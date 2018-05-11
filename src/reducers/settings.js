const settingsReducerDefaultState = {
    visible: true,
    animateList: true,
    animateCard: true
};
const settingsReducer = (state = settingsReducerDefaultState, action) => {
    switch(action.type){
        case 'SETTINGS_CALENDAR_SHOW_TOOLBAR':
            return {
                ...state,
                visible: action.visible
            };
        case 'SETTINGS_HOME_TOGGLE_ANIMATION_LIST':
            return {
                ...state,
                animateList: action.animateList
            };
        case 'SETTINGS_HOME_TOGGLE_ANIMATION_CARD':
            return {
                ...state,
                animateCard: action.animateCard
            }
        default:
            return state;
    }
};


export default settingsReducer;