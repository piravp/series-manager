// ADD_CALENDAR_EVENT (Single day)
export const addCalendarEvent = ({ id, title, startDate, startTime, endTime, calendarType } = {}) => ({
    type: 'ADD_CALENDAR_EVENT',
    data: {
        event: {
            id,
            title,
            start: `${startDate} ${startTime}`,
            end: `${startDate} ${endTime}`,
        },
        calendarType
    }
});


// ADD_CALENDAR_RANGE (Single day)
export const addCalendarLongEvent = ({ id, title, startDate, endDate, startTime, endTime, calendarType } = {}) => ({
    type: 'ADD_CALENDAR_LONG_EVENT',
    data: {
        event: {
            id,
            title,
            start: `${startDate} ${startTime}`,
            end: `${endDate} ${endTime}`,
        },
        calendarType
    }
});