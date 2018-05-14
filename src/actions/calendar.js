import moment from 'moment';

// ADD_CALENDAR_EVENT (Single day)
export const addCalendarEvent = ({ id, title, startDate, startTime, endTime, calendarType } = {}) => ({
    type: 'ADD_CALENDAR_EVENT',
    data: {
        event: {
            id,
            title,
            start: moment(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm').toDate(),
            end: moment(`${startDate} ${endTime}`, 'YYYY-MM-DD HH:mm').toDate(),
        },
        calendarType
    }
});


// ADD_CALENDAR_RANGE (Single day)
export const addCalendarLongEvent = ({ id, title, startDate, /*endDate, */ startTime, endTime, calendarType } = {}) => ({
    type: 'ADD_CALENDAR_LONG_EVENT',
    data: {
        event: {
            id,
            title: `${title} (Recurring)`,
            start: moment(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm').toDate(),
            end: moment(`${startDate} ${endTime}`, 'YYYY-MM-DD HH:mm').toDate(),
        },
        calendarType
    }
});


// REMOVE_CALENDAR_EVENT
export const removeCalendarEvent = ({ id } = {}) => ({
    type: 'REMOVE_CALENDAR_EVENT',
    id
});
