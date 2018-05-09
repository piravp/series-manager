import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { Switch } from 'antd';
import moment from 'moment';
import 'moment/locale/en-gb';
import { connect } from 'react-redux';
import Resizable from 're-resizable';

// Actions
import { removeCalendarEvent } from '../../actions/calendar';
import { settingsCalendar_ShowToolbar } from '../../actions/settings';

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
    state = {
        width: 700,
        height: 500
    }

    render () {
        return (
            <div className="calendarContainer">
                {
                    !this.props.showToolbar
                    ? 
                    <Resizable
                        style={{ border: '1px solid black', borderRadius: '1rem' }}
                        minWidth={500}
                        minHeight={500}
                        size={{ width: this.state.width, height: this.state.height }}
                        onResizeStop={(e, direction, ref, d) => {
                            this.setState({
                            width: this.state.width + d.width,
                            height: this.state.height + d.height,
                            });
                        }}
                    >
                        <BigCalendar
                            style={{ padding: '2rem'}}
                            selectable
                            events={this.props.calendar || []}
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
                    </Resizable>
                    :
                    <BigCalendar
                        style={{ padding: '2rem'}}
                        selectable
                        events={this.props.calendar || []}
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

                }
                    
                
                <div style={{display: 'flex',justifyContent: 'flex-end', margin: '2rem 5rem 0 0'}}>
                    <label style={{marginRight: '1rem'}}>Show toolbar</label>
                    <Switch defaultChecked onChange={visible => this.props.dispatch(settingsCalendar_ShowToolbar({ visible }))}/>
                </div>
            </div>
        );
    }
} 


const mapStateToProps = (state) => {
    return {
        calendar: state.calendar,
        showToolbar: state.settings.visible
      }
  };


export default connect(mapStateToProps)(Calendar);