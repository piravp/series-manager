import React, { Component } from 'react';
import { Select, Button, Input, DatePicker, TimePicker, Switch, Radio, InputNumber } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class CalendarToolbar extends Component {
    state = {
        repeat: 'regular'
    }


    handleToggleRadioBtn = (e) => {
        this.setState( prevState => {
            return {
                repeat: e.target.value
            }
        })
    };
    
    render() {
        return (
            <div className="calendarToolbarParentContainer">
                <div className="calendarToolbarChildContainer">
                    <Input placeholder="Series name" />
                    
                    <div className="calendarDatePicker">
                        {
                            this.state.repeat === 'regular' ? 
                            <DatePicker onChange={e => console.log(e)} placeholder="Pick date"/> :
                            <RangePicker onChange={e => console.log(e)} />
                            
                        }
                        <TimePicker format={'HH:mm'} />
                        <InputNumber min={1} max={200} onChange={e => console.log(e)} placeholder="min"/>
                    </div>

                    <div className="radioEventType">
                        <RadioGroup defaultValue="regular" size="medium" onChange={this.handleToggleRadioBtn}>
                            <RadioButton value="regular">Regular</RadioButton>
                            <RadioButton value="premiere">Premiere</RadioButton>
                        </RadioGroup>
                    </div>
                    
                    <div className="calendarCreateButton">
                        <Button type="primary">Create</Button>
                    </div>
                </div>
            </div>
        )
    }
};

export default CalendarToolbar;



// <div className="toggleRepeat">
// <label>Repeating series</label>
// <Switch defaultChecked={false} onChange={this.handleToggleRepeat}/>
// </div>