import React, { Component } from 'react';
import Calendar from './Calendar';
import CalendarToolbar from './CalendarToolbar';

const events = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2018, 5, 17),
      end: new Date(2018, 6, 1),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2018, 5, 7),
      end: new Date(2018, 5, 10),
    },
    {
      id: 10,
      title: 'Dinner',
      start: new Date(2018, 5, 12, 20, 0, 0, 0),
      end: new Date(2018, 5, 12, 21, 0, 0, 0),
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2018, 5, 13, 7, 0, 0),
      end: new Date(2018, 5, 13, 10, 30, 0),
    },
    {
      id: 12,
      title: 'Late Night Event',
      start: new Date(2018, 5, 17, 19, 30, 0),
      end: new Date(2018, 5, 18, 2, 0, 0),
    },
    {
      id: 13,
      title: 'Multi-day Event',
      start: new Date(2018, 6, 20, 19, 30, 0),
      end: new Date(2018, 6, 22, 2, 0, 0),
    },
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
];


class CalendarPage extends Component {
    state = {
        events: events
    }
    
    render() {
        return (
            <div className="calendarPageContainer">
              <Calendar events={this.state.events}/>
              <CalendarToolbar />
            </div>
        );
    }
};





export default CalendarPage;