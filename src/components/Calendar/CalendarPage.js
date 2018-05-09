import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Custom components
import Calendar from './Calendar';
import CalendarToolbar from './CalendarToolbar';

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

// FIXME: Move to Calendar.js?
const mapStateToProps = (state) => {
  return {
      calendar: state.calendar
    }
};

export default connect(mapStateToProps)(CalendarPage);