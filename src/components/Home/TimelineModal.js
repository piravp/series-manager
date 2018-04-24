import React from 'react';
import { Modal, Timeline, Icon } from 'antd';

import { connect } from 'react-redux';

class TimelineModal extends React.Component {
  state = { 
      visible: false 
    }

  componentDidMount(){
    this.setState({
        visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });

    this.props.closeModalInParent();
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });

    //Update state in parent
    this.props.closeModalInParent();
  }

  resolveTimelineItem = (timelineEvent) => {
    const { id, name, type } = timelineEvent;
    switch (type){
        case 'add_show':
            return <Timeline.Item key={timelineEvent.createdAt+id} color='green'>You added the show <b>{name}</b> at {timelineEvent.createdAt}.</Timeline.Item>;
        case 'remove_show':
            return <Timeline.Item key={timelineEvent.removedAt+id} color='red'>You removed <b>{name}</b> at {timelineEvent.removedAt}.</Timeline.Item>;
          case 'remove_all_shows':
            return <Timeline.Item key={timelineEvent.removedAt+id} dot={<Icon type="tool" style={{ fontSize: '20px' }} />} color='red'>You removed all your shows at {timelineEvent.removedAt}.</Timeline.Item>;
    }
  }

  render() {
    return (
      <div className="timelineModalContainer">
        <Modal
          title="Your timeline"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
            {   this.props.timeline.length > 0 ? 
                <Timeline>
                    {this.props.timeline.map(timelineEvent => this.resolveTimelineItem(timelineEvent))}
                </Timeline> :
                <i>There are no events to show here... at least not yet!</i>
            }
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        timeline: state.timeline
    }
}

export default connect(mapStateToProps)(TimelineModal);