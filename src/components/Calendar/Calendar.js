import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/en-gb';
import { connect } from 'react-redux';

// Actions
import { removeCalendarEvent } from '../../actions/calendar';

// Import styles
import 'react-big-calendar/lib/css/react-big-calendar.css'


// Setup the localizer 
moment.locale('en-gb');
BigCalendar.momentLocalizer(moment);

const eventStyles = {
    event: {
        backgroundColor:'#ad3155',
        color: 'white',
        borderRadius:10
    },
}


class Calendar extends Component {
    render () {
        return (
            <div className="calendarContainer">
                <BigCalendar
                    selectable
                    events={this.props.events}
                    startAccessor='start'
                    endAccessor='end'
                    views={['month', 'agenda']}
                    onSelectSlot={(e) => console.log('slot',e)}
                    onSelectEvent={({id}) => this.props.dispatch(removeCalendarEvent({ id }))}
                    defaultDate={moment().toDate()}
                    eventPropGetter={(event,start,end,isSelected)=>{
                        return {
                            style: eventStyles.event
                        }
                    }}
                    formats={{
                        agendaDateFormat: (date, culture, localizer) =>
                            localizer.format(date, 'DD.MM.YYYY', culture)
                    }}
                />
            </div>
        );
    }
} 


export default connect()(Calendar);