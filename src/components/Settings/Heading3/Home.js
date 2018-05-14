import React, { Component } from 'react';
import { Switch, TreeSelect } from 'antd'; 

//Actions
import { 
    settingsHome_ToggleListAnimation, 
    settingsHome_ToggleCardAnimation,
    settingsHome_TimelineFilter 
} from '../../../actions/settings';


const SettingsCardAnimation = (props) => (
    <span style={{ marginTop: '1rem' }}>
        <Switch style={{ marginRight: '1rem' }} checked={props.settings.animateCard} size="small" onChange={checked => props.dispatchAction(settingsHome_ToggleCardAnimation({ animateCard: checked }))} />        
        Turn on/off animation for the card view in home.
    </span>
);

const SettingsListAnimation = (props) => (
    <span style={{ marginTop: '1rem' }}>
        <Switch style={{ marginRight: '1rem' }} checked={props.settings.animateList} size="small" onChange={checked => props.dispatchAction(settingsHome_ToggleListAnimation({ animateList: checked }))} />        
        Turn on/off animation for the list view in home.
    </span>
);


export const SettingsAnimation = (props) => (
    <div>
        <h3 id="animation">
            <a href="#animation" className="anchor">#</a>        
            <span>Animation</span>&nbsp;
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingsCardAnimation settings={props.settings} dispatchAction={props.dispatchAction}/>
            <SettingsListAnimation settings={props.settings} dispatchAction={props.dispatchAction}/>
        </div>
    </div>
);


const defaultTimelineEventsState = [
    {
        label: 'Add show',
        value: 'add_show',
        key: 'Add show'
    },
    {
        label: 'Remove show',
        value: 'remove_show',
        key: 'Remove show'
    },
    {
        label: 'Remove all shows',
        value: 'remove_all_shows',
        key: 'Remove all shows'
    },
    {
        label: 'Add collection',
        value: 'add_collection',
        key: 'Add collection'
    },
    {
        label: 'Remove collection',
        value: 'remove_collection',
        key: 'Remove collection'
    }
]      

export class SettingsTimeline extends Component {
    state = {
        //timelineEvents: [],
        timelineEvents: defaultTimelineEventsState,        
        selectedTimelineEventKeys: [],
    }
    
    componentDidMount(){
        this.setState({ selectedTimelineEventKeys: this.props.settings.timelineFilter })
    }

    handleOnTimelineFilterChange = (selectedTimelineArray) => {
        this.setState({  selectedTimelineEventKeys: selectedTimelineArray });

        // Set timelineFilter in the settings reducer
        this.props.dispatchAction(settingsHome_TimelineFilter({ timelineFilter: selectedTimelineArray }));

    };

    render() {
        const tProps = {
            treeData: this.state.timelineEvents,
            value: this.state.selectedTimelineEventKeys,
            onChange: this.handleOnTimelineFilterChange,
            treeCheckable: true,
            placeholder: 'Select events (multiple)',
            style: { width: 600 },
          };

        return (
            <div>
                <h3 id="timeline">
                    <a href="#timeline" className="anchor">#</a>        
                    <span>Timeline</span>&nbsp;
                </h3>
                <span>
                    Decide which events should be registered in the timeline. 
                    <div>
                        <TreeSelect {...tProps} />
                    </div>
                </span>
            </div>
        );
    }
};
