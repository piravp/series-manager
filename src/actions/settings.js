// SETTINGS_CALENDAR_SHOW_TOOLBAR
export const settingsCalendar_ShowToolbar = ({ visible } = {}) => ({
    type: 'SETTINGS_CALENDAR_SHOW_TOOLBAR',
    visible
});

// SETTINGS_HOME_TOGGLE_ANIMATION_LIST
export const settingsHome_ToggleListAnimation = ({ animateList } = {}) => ({
    type: 'SETTINGS_HOME_TOGGLE_ANIMATION_LIST',
    animateList
});

// SETTINGS_HOME_TOGGLE_ANIMATION_CARD
export const settingsHome_ToggleCardAnimation = ({ animateCard } = {}) => ({
    type: 'SETTINGS_HOME_TOGGLE_ANIMATION_CARD',
    animateCard
});