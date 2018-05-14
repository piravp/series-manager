
// Get filtered timeline events
const getVisibleTimelineEvents = (timelineEvents, selectedEvents) => {
    // Loop through every event inside timelineEvents
    return timelineEvents.filter(event => {
        // Return event if type is same as the filtered list
        return selectedEvents.indexOf(event.type) !== -1;
    });


};

export default getVisibleTimelineEvents;
