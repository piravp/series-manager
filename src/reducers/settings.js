const settingsReducerDefaultState = {
    visible: true,
    animateList: true,
    animateCard: true,
    timelineFilter: ['add_show', 'remove_show', 'remove_all_shows', 'add_collection', 'remove_collection', ]
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
            };
        case 'SETTINGS_SET_TIMELINE_FILTER':
            return {
                ...state,
                timelineFilter: action.timelineFilter
            };
        default:
            return state;
    }
};


export default settingsReducer;