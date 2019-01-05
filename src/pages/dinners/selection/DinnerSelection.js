import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import * as API from "duke-convos-api";
import API2 from "../../../api.js";
import SelectionRow from "./SelectionRow";

export default class DinnerSelection extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      originalApplicationStatuses: {},
      applicationsDict: {}
    };
  }

  componentDidMount() {
    API.getDinner(
      this.props.match.params.id,
      // the data is returned in dinner
      dinner => {
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
        console.error(error);
      }
    );
  }

  saveChanges = () => {
    let { applicationsDict, originalApplicationStatuses } = this.state;
    let applicationsToUpdate = {};

    for (let applicationID in applicationsDict) {
      let application = applicationsDict[applicationID];

      if (application.status !== originalApplicationStatuses[application.id]) {
        applicationsToUpdate[application.id] = application.status;
      }
    }

    API2.updateApplicationStatuses(
      applicationsToUpdate,
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  };

  confirm = () => {
    API2.confirmDinnerSelection(
      this.props.match.params.id,
      response => {
        console.log(response);
      },
      error => {
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

  render() {
    let { applicationsDict } = this.state;
    let handler = this.updateApplicationStatus;

    var pendingRows = [];
    var acceptedRows = [];
    var waitlistedRows = [];

    for (let applicationID in applicationsDict) {
      let application = applicationsDict[applicationID];
      if (application.status === 0 || application.status == 2) {
        pendingRows.push(
          <SelectionRow application={application} onClickHandler={handler} />
        );
      } else if (application.status === 1) {
        acceptedRows.push(
          <SelectionRow application={application} onClickHandler={handler} />
        );
      } else if (application.status === 3) {
        waitlistedRows.push(
          <SelectionRow application={application} onClickHandler={handler} />
        );
      }
    }

    return (
      <Container>
        <Row className="my-2">
          <Col className="col-4">
            <Table bordered responsive>
              <tbody>{pendingRows}</tbody>
            </Table>
          </Col>
          <Col className="col-4">
            <Table bordered responsive>
              <tbody>{acceptedRows}</tbody>
            </Table>
          </Col>
          <Col className="col-4">
            <Table bordered responsive>
              <tbody>{waitlistedRows}</tbody>
            </Table>
          </Col>
        </Row>
        <Row className="my-2">
          <Col className="col-4 mx-2">
            <Button onClick={this.confirm}>Confirm & Notify Applicants</Button>
          </Col>
          <Col className="col-4 mx-2">
            <Button onClick={this.saveChanges}>Save</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
