import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class DeleteModalControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  actionAndToggle = () => {
    this.props.onClickAction();
    this.toggle();
  };

  render() {
    /*
    props:
      buttonColor
      buttonTitle
      modalTitle
    */
    return (
      <div>
        <Button color={this.props.buttonColor} onClick={this.toggle}>
          {this.props.buttonTitle}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={false}>
          <ModalHeader toggle={this.toggle}>
            {this.props.modalTitle}
          </ModalHeader>
          <ModalBody>Are you sure? This action cannot be undone.</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.actionAndToggle}>
              Delete
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
