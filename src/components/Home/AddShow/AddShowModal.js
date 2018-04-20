import React from 'react';
import { Modal, Button } from 'antd';

import PicturesWall from './PicturesWall';
import {WrappedDemo} from './AddShowModalForm';

export default class AddShowModal extends React.Component {
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
      <div className="addShowModalContainer">
        <Modal
          title="Add new series"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <PicturesWall />

          <WrappedDemo />
        </Modal>
      </div>
    );
  }
}