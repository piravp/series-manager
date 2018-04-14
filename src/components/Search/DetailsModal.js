import React from 'react';
import { Modal, Button } from 'antd';

export default class DetailsModal extends React.Component {
  state = { 
      visible: false 
    }

    componentDidMount(){
        this.setState({
            visible: true,
          });
          console.log("helloooooo")
    }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });

    this.props.closeModalInParent();
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });

    //Update state in parent
    this.props.closeModalInParent();
  }
  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}