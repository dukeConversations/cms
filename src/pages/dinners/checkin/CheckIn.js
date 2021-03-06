import React, { Component } from "react";
import API from "duke-convos-api";
import CheckInRow from "./CheckInRow";
import { Button, Table } from "reactstrap";
import ErrorView from "../../../ErrorView";

export default class CheckIn extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      originalStatuses: {},
      currentApplications: {},
      error: null
    };
  }

  componentDidMount() {
    API.getDinner(
      this.props.match.params.id,
      // the data is returned in dinner
      dinner => {
        this.setState({ error: null });

        let attendanceStatuses = {};
        let applicationsDict = {};

        for (var i = 0; i < dinner.applications.length; i++) {
          let application = dinner.applications[i];

          if (application.status === 1) {
            attendanceStatuses[application.id] = application.present;
            applicationsDict[application.id] = application;
          }
        }

        this.setState({
          originalStatuses: attendanceStatuses,
          currentApplications: applicationsDict
        });
      },
      // an error is returned
      error => {
        this.setState({ error: error });
      }
    );
  }

  updateApplicationAttendance = id => {
    var applicationsDict = this.state.currentApplications;
    applicationsDict[id].present = !applicationsDict[id].present;
    this.setState({ currentApplications: applicationsDict });
  };

  saveChanges = () => {
    let { currentApplications, originalStatuses } = this.state;
    let applicationsToUpdate = {};

    for (let id in currentApplications) {
      if (currentApplications[id].present !== originalStatuses[id]) {
        applicationsToUpdate[id] = currentApplications[id].present;
      }
    }

    API.updateApplicationAttendance(
      applicationsToUpdate,
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    let { currentApplications } = this.state;
    let handler = this.updateApplicationAttendance;

    const checkInRows = Object.keys(currentApplications).map(function(
      applicationID
    ) {
      return (
        <CheckInRow
          application={currentApplications[applicationID]}
          onClickHandler={handler}
        />
      );
    });

    return (
      <div>
        {this.state.error !== null && <ErrorView error={this.state.error} />}
        <h3>Check In</h3>
        <Table responsive>
          <tbody>
            {/* Add the rows to represent each dinner */}
            {checkInRows}
          </tbody>
        </Table>
        <Button onClick={this.saveChanges}>Save</Button>
      </div>
    );
  }
}
