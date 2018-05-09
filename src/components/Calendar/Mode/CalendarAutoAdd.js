import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Button } from 'antd';

const Option = Select.Option;

class CalendarAutoAdd extends Component {
    state = {
        usersShows: [],
        selectedShows: []
    }

    // Get series user can choose from
    componentDidMount() {
        this.props.series.map(show => 
            this.setState(prevState => {
                return {
                    usersShows: prevState.usersShows.concat(<Option key={show.name}>{show.name}</Option>)
                }
            })
        )
    };

    handleBtnClick = (e) => {
        console.log('btnClick',this.state.selectedShows)

        const some = this.state.selectedShows.map(usersSelectedShow => this.props.series.find( show => usersSelectedShow === show.name))
        console.log(some);
        
    };

    handleChange = (selectedAsArray) => {

        this.setState({ selectedShows: selectedAsArray })
    }

    render() {
        return (
            <div className="calendarAutoAddParentContainer">

                    <Select
                        mode="multiple"
                        style={{ width: '450px' }}
                        placeholder="Please select"
                        onChange={this.handleChange}
                    >
                        {this.state.usersShows}
                    </Select>

                    <div className="calendarCreateButton-AutoMode">
                        <Button type="primary" onClick={this.handleBtnClick}>Create</Button>
                    </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        series: state.series
    }
}

export default connect(mapStateToProps)(CalendarAutoAdd);
