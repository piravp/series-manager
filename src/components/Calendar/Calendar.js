import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Import styles
import 'react-big-calendar/lib/css/react-big-calendar.css'



// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    
    
    render () {
        return (
            <div>
                <BigCalendar
                    selectable
                    events={this.props.events}
                    startAccessor='start'
                    endAccessor='end'
                    views={['month', 'week', 'agenda']}
                    onSelectSlot={(e) => console.log(e)}
                    onSelectEvent={(e) => console.log(e)}
                    defaultDate={moment().toDate()}
                />
            </div>
        );
    }
} 


export default Calendar;