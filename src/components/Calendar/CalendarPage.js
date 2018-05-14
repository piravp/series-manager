import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Custom components
import Calendar from './Calendar';
import CalendarToolbar from './CalendarToolbar';


const CalendarPage = (props) => (
  <div className="calendarPageContainer">
    <Calendar />
    {
      props.showToolbar && 
      <CalendarToolbar />
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    showToolbar: state.settings.visible
  }
};

export default connect(mapStateToProps)(CalendarPage);