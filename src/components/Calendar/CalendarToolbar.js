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
        interval: 7,
        existingShow: 'new',
        shows: []
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

    handleToggleShowExists = (e) => {

        this.setState( prevState => {
            return {
                existingShow: e.target.value
            }
        })

        // Fetch shows (if not fetched earlier)
        if (this.state.shows.length === 0)  {
            console.log('props', this.props);
            this.props.series.map(show => {
                console.log(show.name);
                this.setState( prevState => {
                    return {
                        existingShow: 'existing',
                        shows: prevState.shows.concat(show.name)
                    }
                })
            })
        }
    };

    render() {
        return (
            <div className="calendarToolbarParentContainer">
                <div className="calendarToolbarChildContainer">
                    <div style={{ marginBottom: 30 }}>
                        <label style={{alignItems: 'flex-end', marginRight: 5}}>Show already exist in your list?</label>
                        <RadioGroup defaultValue="new" size="small" onChange={this.handleToggleShowExists}>
                            <RadioButton value="new">New</RadioButton>
                            <RadioButton value="existing">Existing</RadioButton>
                        </RadioGroup>
                    </div>
                
                    {
                        this.state.existingShow==='new' ? 
                        <Input placeholder="Series name" onChange={e => this.setState({ title: e.target.value })}/> :
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a series from your list"
                            optionFilterProp="children"
                            onChange={value => this.setState({ title: value })}
                            onFocus={() => console.log('focus')}
                            onBlur={() => console.log('blur')}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.state.shows.map(showName => (
                                    <Select.Option key={showName} value={showName}>{showName}</Select.Option>
                                ))
                            }
                            

                        </Select>
                    }

                    <div className="radioEventType">
                        <label style={{alignItems: 'flex-end', marginRight: 5}}>Recurring show?</label>
                        <RadioGroup defaultValue="single" size="medium" onChange={this.handleToggleRadioBtn}>
                            <RadioButton value="single">Single</RadioButton>
                            <RadioButton value="recurring">Recurring</RadioButton>
                        </RadioGroup>
                    </div>


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

                    
                    <div className="calendarCreateButton">
                        <Button type="primary" onClick={this.state.repeat==='recurring' ? this.handleAddLongEvent : this.handleAddEvent}>Create</Button>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        series: state.series
    }
}

export default connect(mapStateToProps)(CalendarToolbar);
