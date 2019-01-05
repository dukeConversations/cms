import React, { Component } from "react";
import API from "duke-convos-api";
import API2 from "../../../api.js";
import CheckInRow from "./CheckInRow";
import { Button, Table } from "reactstrap";

export default class CheckIn extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      attendanceStatuses: {}
    };
  }

  componentDidMount() {
    API.getDinner(
      this.props.match.params.id,
      // the data is returned in dinner
      dinner => {
        let attendanceStatuses = {};
        for (var i = 0; i < dinner.applications.length; i++) {
          let application = dinner.applications[i];

          if (application.status === 1) {
            attendanceStatuses[application.id] = application.present;
          }
        }

        this.setState({ attendanceStatuses: attendanceStatuses });
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  }

  updateStatusesDict = applicationID => {
    var statuses = this.state.attendanceStatuses;
    statuses[applicationID] = !statuses[applicationID];
    this.setState({ attendanceStatuses: statuses });
  };

  saveChanges = () => {
    API2.updateApplicationAttendance(
      this.state.attendanceStatuses,
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    let { attendanceStatuses } = this.state;
    let handler = this.updateStatusesDict;
    const checkInRows = Object.keys(attendanceStatuses).map(function(
      applicationID
    ) {
      return (
        <CheckInRow
          applicationID={applicationID}
          status={attendanceStatuses[applicationID]}
          onClickHandler={handler}
        />
      );
    });

    return (
      <div>
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
