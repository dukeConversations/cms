import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

export default class CheckInRow extends Component {
  changeStatus = status => {
    this.props.changeStatusHandler(this.props.application.id, status);
    this.props.toggle();
  };

  render() {
    let application = this.props.application;
    console.log(application);

    const closeBtn = (
      <button className="close" onClick={this.props.toggle}>
        &times;
      </button>
    );

    return (
      <Fragment>
        <ModalHeader close={closeBtn} toggle={this.props.toggle}>
          {application.student.firstName + " " + application.student.lastName}
        </ModalHeader>
        <ModalBody>{application.interest}</ModalBody>
        <ModalFooter>
          {application.status !== 0 && (
            <Button color="primary" onClick={() => this.changeStatus(0)}>
              Reject
            </Button>
          )}
          {application.status !== 1 && (
            <Button color="primary" onClick={() => this.changeStatus(1)}>
              Accept
            </Button>
          )}
          {application.status !== 3 && (
            <Button color="primary" onClick={() => this.changeStatus(3)}>
              Waitlist
            </Button>
          )}
          <Button color="secondary" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Fragment>
    );
  }
}
