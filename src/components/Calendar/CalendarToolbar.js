import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Button, Input, DatePicker, TimePicker, Switch, Radio, InputNumber } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import moment from 'moment';
import uuidv4 from 'uuid/v4';

import { addCalendarEvent, addCalendarLongEvent } from '../../actions/calendar'

class CalendarToolbar extends Component {
    state = {
        title: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        repeat: 'single',
        interval: 7
    }


    handleToggleRadioBtn = (e) => {
        this.setState( prevState => {
            return {
                repeat: e.target.value
            }
        })
    };
    
    // Add single event
    handleAddEvent = (e) => {
        this.props.dispatch(
            addCalendarEvent({ 
                id: uuidv4(), 
                title: this.state.title, 
                startDate: this.state.startDate, 
                startTime: this.state.startTime, 
                endTime: this.state.endTime, 
                calendarType: this.state.repeat
            })
        )
    };

    // Add event which extends over several days (regular/recurring series)
    handleAddLongEvent = (e) => {
        const start = this.state.startDate;
        const end = this.state.endDate;
        const interval = this.state.interval;
        const id = uuidv4();
        for (let current=moment(start, 'YYYY-MM-DD'); current < moment(end, 'YYYY-MM-DD'); current.add(interval, 'days')){
            //console.log(current._d)
            this.addLongEvent(id, moment(current._d).format('YYYY-MM-DD'))
        }
        

    };

    // Callback
    addLongEvent = (id, start) => {

        this.props.dispatch(
            addCalendarLongEvent({ 
                id: id, 
                title: this.state.title, 
                startDate: start,
                startTime: this.state.startTime, 
                endTime: this.state.endTime, 
                calendarType: this.state.repeat 
            })
        )
    };
    // // In case range is wanted later
    // this.props.dispatch(
    //     addCalendarLongEvent({ 
    //         id: id, 
    //         title: this.state.title, 
    //         startDate: start, 
    //         endDate: end,
    //         startTime: this.state.startTime, 
    //         endTime: this.state.endTime, 
    //         calendarType: this.state.repeat 
    //     })
    // )

    render() {
        return (
            <div className="calendarToolbarParentContainer">
                <div className="calendarToolbarChildContainer">
                    <Input placeholder="Series name" onChange={e => this.setState({ title: e.target.value })}/>
                    
                    <div className="calendarDatePicker">
                        {
                            this.state.repeat === 'single' ? 
                            <DatePicker onChange={e => this.setState({ startDate: moment(e._d).format('YYYY-MM-DD') })} placeholder="Pick date"/> :
                            <RangePicker onChange={dates => 
                                this.setState({
                                    startDate: moment(dates[0]._d).format('YYYY-MM-DD'), 
                                    endDate: moment(dates[1]._d).format('YYYY-MM-DD')
                                })
                            }/>

                        }
                        <TimePicker style={{ marginLeft: 10 }} format={'HH:mm'} onChange={e => this.setState({ startTime: moment(e._d).format('HH:mm') })} />
                        <div style={{ marginLeft: 15 }}>
                            <InputNumber min={1} 
                                        max={200} 
                                        onChange={value =>  this.setState({ endTime: moment(moment(this.state.startTime, 'HH:mm').add(value, 'minutes')._d).format('HH:mm') }) } 
                                        placeholder="duration"/>
                            <label style={{alignItems: 'flex-end', marginLeft: 5}}>minutes</label>
                        </div>
                    </div>

                    {
                        this.state.repeat === 'recurring' && 
                        <div style={{ marginTop: 30 }}>
                            <label style={{alignItems: 'flex-end', marginRight: 5}}>Recurring every</label>
                            <InputNumber min={1} 
                                        max={31} 
                                        defaultValue={7}
                                        onChange={value =>  this.setState({ interval: value }) } 
                                        placeholder=""/>
                            <label style={{alignItems: 'flex-end', marginLeft: 5}}>days</label>
                        </div>  
                    }

                    <div className="radioEventType">
                        <RadioGroup defaultValue="single" size="medium" onChange={this.handleToggleRadioBtn}>
                            <RadioButton value="single">Single</RadioButton>
                            <RadioButton value="recurring">Recurring</RadioButton>
                        </RadioGroup>
                    </div>
                    
                    <div className="calendarCreateButton">
                        <Button type="primary" onClick={this.state.repeat==='recurring' ? this.handleAddLongEvent : this.handleAddEvent}>Create</Button>
                    </div>
                </div>
            </div>
        )
    }
};


export default connect()(CalendarToolbar);
