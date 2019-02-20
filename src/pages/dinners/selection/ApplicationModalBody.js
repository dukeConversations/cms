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
import Dicts from "../../../dictionaries";

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
          Application Details
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <strong>Applicant info:</strong>
              </Col>
            </Row>
            <Row>
              <Col>
                <ul>
                  <li>{"netID: " + application.student.netID}</li>
                  <li>{"grad year: " + application.student.graduationYear}</li>
                  <li>
                    {"major: " + Dicts.getMajor(application.student.major)}
                  </li>
                  <li>{"apps: " + application.student.numberApplications}</li>
                  <li>
                    {"apps this sem: " +
                      application.student.numberApplicationsSemester}
                  </li>
                  <li>
                    {"selections: " + application.student.numberSelections}
                  </li>
                  <li>
                    {"selections this sem: " +
                      application.student.numberSelectionsSemester}
                  </li>
                  <li>
                    {"dietary restrictions: " +
                      application.student.dietaryRestrictions}
                  </li>
                </ul>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <strong>Application:</strong>
              </Col>
            </Row>
            <Row>
              <Col>
                <ul>
                  <li>{"Interest: " + application.interest}</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </ModalBody>
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
            Close
          </Button>
        </ModalFooter>
      </Fragment>
    );
  }
}
