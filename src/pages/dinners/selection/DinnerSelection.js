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
import * as API from "duke-convos-api";
import SelectionRow from "./SelectionRow";
import ApplicationModalBody from "./ApplicationModalBody";
import ErrorView from "../../../ErrorView";

export default class DinnerSelection extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      originalApplicationStatuses: {},
      applicationsDict: {},
      showModal: false,
      selectedApplication: null,
      error: null,
      displayMessage: null
    };
  }

  componentDidMount() {
    API.getDinner(
      this.props.match.params.id,
      // the data is returned in dinner
      dinner => {
        this.setState({ error: null });

        let applicationStatuses = {};
        let applicationsDict = {};

        for (var i = 0; i < dinner.applications.length; i++) {
          let application = dinner.applications[i];
          applicationStatuses[application.id] = application.status;
          applicationsDict[application.id] = application;
        }

        this.setState({
          originalApplicationStatuses: applicationStatuses,
          applicationsDict: applicationsDict
        });
      },
      // an error is returned
      error => {
        this.setState({ error: error });
      }
    );
  }

  reset = () => {
    let { applicationsDict } = this.state;
    let applicationsToUpdate = {};

    for (let applicationID in applicationsDict) {
      let application = applicationsDict[applicationID];
      applicationsToUpdate[application.id] = 2;
    }

    API.updateApplicationStatuses(
      applicationsToUpdate,
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );

    window.location.reload();
  };

  saveChanges = () => {
    let { applicationsDict, originalApplicationStatuses } = this.state;
    let applicationsToUpdate = {};

    for (let applicationID in applicationsDict) {
      let application = applicationsDict[applicationID];

      if (application.status !== originalApplicationStatuses[application.id]) {
        applicationsToUpdate[application.id] = application.status;
      }
    }

    API.updateApplicationStatuses(
      applicationsToUpdate,
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );

    this.setState({ displayMessage: "Changes Saved!" });
  };

  confirm = () => {
    API.confirmDinnerSelection(
      this.props.match.params.id,
      response => {
        this.setState({ displayMessage: "Dinners Confirmed!" });
        this.props.history.push("/");
        console.log(response);
      },
      error => {
        this.setState({ displayMessage: "Error" });
        console.log(error);
      }
    );
  };

  updateApplicationStatus = (id, status) => {
    let { applicationsDict } = this.state;
    let application = applicationsDict[id];
    application.status = status;
    applicationsDict[id] = application;
    this.setState({ applicationsDict: applicationsDict });
  };

  toggle = () => {
    this.setState({ showModal: false });
  };

  viewApplication = id => {
    let { applicationsDict } = this.state;
    let application = applicationsDict[id];

    this.setState({ showModal: true, selectedApplication: application });
  };

  render() {
    let { applicationsDict } = this.state;
    let handler = this.updateApplicationStatus;
    let openAppHandler = this.viewApplication;

    var pendingRows = [];
    var acceptedRows = [];
    var waitlistedRows = [];

    for (let applicationID in applicationsDict) {
      let application = applicationsDict[applicationID];
      let applicationSelectionRow = (
        <SelectionRow
          key={application.id}
          application={application}
          changeStatusHandler={handler}
          openAppHandler={openAppHandler}
        />
      );
      if (application.status === 0 || application.status == 2) {
        pendingRows.push(applicationSelectionRow);
      } else if (application.status === 1) {
        acceptedRows.push(applicationSelectionRow);
      } else if (application.status === 3) {
        waitlistedRows.push(applicationSelectionRow);
      }
    }

    return (
      <Fragment>
        {this.state.error !== null && <ErrorView error={this.state.error} />}
        <Container style={{ paddingTop: 20 }}>
          <Row className="my-2">
            <Col className="col-4 text-center">
              <h2> PENDING </h2>
              <hr />
              <Table bordered responsive>
                <tbody>{pendingRows}</tbody>
              </Table>
            </Col>
            <Col className="col-4 text-center">
              <h2> ACCEPTED </h2>
              <hr />
              <Table bordered responsive>
                <tbody>{acceptedRows}</tbody>
              </Table>
            </Col>
            <Col className="col-4 text-center">
              <h3> WAITLISTED </h3>
              <hr />
              <Table bordered responsive>
                <tbody>{waitlistedRows}</tbody>
              </Table>
            </Col>
          </Row>

          <hr />

          <Row className="my-2">
            <Col className="col-4 text-center">
              <Button
                style={{ width: "80%", backgroundColor: "green" }}
                onClick={this.confirm}
              >
                Confirm & Notify Applicants
              </Button>
            </Col>
            <Col className="col-4 text-center">
              <Button style={{ width: "80%" }} onClick={this.reset}>
                Reset
              </Button>
            </Col>
            <Col className="col-4 text-center">
              <Button
                style={{ width: "80%", backgroundColor: "blue" }}
                onClick={this.saveChanges}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Container>

        {this.state.showModal &&
          this.state.selectedApplication !== null && (
            <Modal
              className="modal-dialog modal-dialog-centered"
              isOpen={this.state.showModal}
              toggle={this.toggle}
              backdrop={false}
            >
              <ApplicationModalBody
                application={this.state.selectedApplication}
                toggle={this.toggle}
                changeStatusHandler={handler}
              />
            </Modal>
          )}
      </Fragment>
    );
  }
}
