
import React, { Component } from 'react';
import { Switch, Popconfirm, message, Button } from 'antd'; 

import { removeAllShows } from '../../../actions/series';
import { removeAllShowsFromTimeline } from '../../../actions/timeline';

import { clearStorage } from '../../../utils/localStorage';

// <h3 id="delete-everything">
// <a href="#delete-everything" className="anchor">#</a>        
// <span>Delete everything</span>&nbsp;
// </h3>
export const DangerSection = (props) => (
    <div id="delete-everything" style={{ display: 'flex', flexDirection: 'column' }}>
        <RemoveShows dispatchAction={props.dispatchAction}/>
        <DeleteEverything settings={props.settings} dispatchAction={props.dispatchAction}/>
    </div>
);

const RemoveShows = (props) => (
    <span className="settingsDeleteShows">
        <Button onClick={(e) => {
            props.dispatchAction(removeAllShows())
            clearStorage
            props.dispatchAction(removeAllShowsFromTimeline())
        }}
            disabled={props.seriesListLength === 0}
            type="danger"
            ghost
        >
            Remove shows
        </Button>
    <p><i>This will remove all the shows you have. This action can <b>NOT</b> be reverted.</i></p>
    </span>
);

class DeleteEverything extends Component {
    state = {
        visible: false,
        condition: true, // Whether meet the condition, if not show popconfirm.,
        switchChecked: false
    };

    changeCondition = (value) => {
        this.setState({ condition: value });
      };

    confirm = () => {
        this.setState({ visible: false, switchChecked: true });
        message.error('Everything was deleted. SAD.');
    };

    cancel = () => {
        this.setState({ visible: false });
        message.info('Catastrophe diverted - clever choice!');
    };

    handleVisibleChange = (visible) => {
        if (!visible) {
            this.setState({ visible });
            return;
        }
        // Determining condition before show the popconfirm.
        console.log(this.state.condition);
        if (this.state.condition) {
            this.confirm(); // next step
        } else {
            this.setState({ visible }); // show the popconfirm
        }
    }

    render() {
        return (
            <span className="settingsDeleteEverything">
                <Popconfirm title="Are you sure about deleting everything?"

                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No">
                        <Button disabled={true} type="danger" size="default">Delete everything</Button>
                </Popconfirm>
                            
                <p><i>This deletes everything you have stored. This includes series, collections, timeline, calendar events along with any settings. 
                This action can <b>NOT</b> be reverted.</i></p>
            </span>
        );
    }
}

