import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Button, Input, DatePicker, TimePicker, Radio, InputNumber } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option, OptGroup } = Select;
import moment from 'moment';
import uuidv4 from 'uuid/v4';

// Import actions
import { addCalendarEvent, addCalendarLongEvent } from '../../../actions/calendar'


class CalendarManualAdd extends Component {
    state = {
        title: '',                          // Title of the event
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        repeat: 'single',                   // Recurring series?
        interval: 7,                        // If recurring --> interval 
        existingShow: 'existing',           // Let user choose from existing show dropdown by default
        shows: [],                          // List of all the users show
        collections: []
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

    fetchCollections = (bool, nextState) => {
        // Fetch collections (if not fetched earlier)
        // and the user has chosen to choose from an existing show
        if (this.state.shows.length === 0 && this.state.existingShow === 'existing')  {
            this.props.collection.map(collection => {
                this.setState( prevState => {
                    return {
                        existingShow: 'existing',
                        collections: prevState.collections.concat(collection)
                    }
                })
            })
        }
    };

    fetchShows = () => {
        // Fetch shows (if not fetched earlier)
        // and the user has chosen to choose from an existing show
        if (this.state.shows.length === 0 && this.state.existingShow === 'existing')  {
            this.props.series.map(show => {
                this.setState( prevState => {
                    return {
                        existingShow: 'existing',
                        shows: prevState.shows.concat(show)
                    }
                })
            })
        }
    };

    componentDidMount(){
        // Fetch shows upon first mount
        this.fetchShows();
        // Fetch collections upon first mount
        this.fetchCollections();
    };


    handleToggleShowExists = (e) => {
        this.setState( prevState => {
            return {
                existingShow: e.target.value
            }
        })
    };


    render() {
        return (
            <div className="calendarManualAddParentContainer">
                <div className="calendarManualAddChildContainer">                
                    <div style={{ marginBottom: 30 }}>
                        <label style={{alignItems: 'flex-end', marginRight: 5}}>Show already exist in your collection?</label>
                        <RadioGroup defaultValue="existing" size="small" onChange={this.handleToggleShowExists}>
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
                            placeholder="Select a series from your collection"
                            optionFilterProp="children"
                            onChange={value => this.setState({ title: value })}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.props.collection && this.props.collection.map(collection => (

                                    <OptGroup key={collection} label={collection}>
                                        {
                                            this.state.shows.map(show => {
                                                if (show.collection === collection){
                                                    return (
        
                                                        <Option key={show.name} value={show.name}>{show.name}</Option>
        
                                                    )
                                                }
                                            })
                                        }
                                    </OptGroup>
        
                                    
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
                            <DatePicker onChange={e => e && this.setState({ startDate: moment(e._d).format('YYYY-MM-DD') })} placeholder="Pick date"/> :
                            <RangePicker onChange={dates => 
                                this.setState({
                                    startDate: moment(dates[0]._d).format('YYYY-MM-DD'), 
                                    endDate: moment(dates[1]._d).format('YYYY-MM-DD')
                                })
                            }/>

                        }
                        <TimePicker style={{ marginLeft: 10 }} format={'HH:mm'} onChange={e => e && this.setState({ startTime: moment(e._d).format('HH:mm') })} />
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
        series: state.series,
        collection: state.collection
    }
}

export default connect(mapStateToProps)(CalendarManualAdd);
