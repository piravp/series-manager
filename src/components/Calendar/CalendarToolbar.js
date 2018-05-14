import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Tooltip } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

// Custom components
import CalendarManualAdd from './Mode/CalendarManualAdd';
import CalendarAutoAdd from './Mode/CalendarAutoAdd';

class CalendarToolbar extends Component {
    state = {
        addEventMode: 'manual'
    }

    handleToggleAddEventMode = (e) => {
        this.setState( prevState => {
            return {
                addEventMode: e.target.value
            }
        })
    }

    render() {
        return (
            <div className="calendarParentToolbarContainer">
                <div className="calendarChildToolbarContainer">
                    <label className="calendarToolbarTitle" >
                        {`Add event (${this.state.addEventMode})`}
                    </label>
                    
                    <RadioGroup className="radioChangeMode" defaultValue="manual" size="medium" onChange={this.handleToggleAddEventMode}>
                        <RadioButton value="manual">Manually add</RadioButton>
                        <Tooltip title="Pick from your list --> TDS does the rest" mouseEnterDelay={0.1}>
                        <RadioButton disabled={false} value="auto">Automatic</RadioButton>
                        </Tooltip>
                    </RadioGroup>

                    {
                        this.state.addEventMode==='manual' ?
                        <CalendarManualAdd /> :
                        <CalendarAutoAdd />
                    }

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
