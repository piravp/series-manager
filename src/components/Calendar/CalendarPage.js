import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Custom components
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
      id: 'asdlkj23e',
      title: 'Long Event',
      start: '2018-05-08 22:00',
      end: '2018-05-08 23:00',
    },
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
];


// class CalendarPage extends Component {

//     render() {
//         console.log(this.props.calendar)
//         return (
//             <div className="calendarPageContainer">
//               <Calendar events={this.props.calendar}/>
//               <CalendarToolbar />
//             </div>
//         );
//     }
// };

const CalendarPage = (props) => (
  <div className="calendarPageContainer">
    <Calendar events={props.calendar}/>
    <CalendarToolbar />
  </div>
);

const mapStateToProps = (state) => {
  //console.log(state)  
  return {
      calendar: state.calendar
    }
};

export default connect(mapStateToProps)(CalendarPage);