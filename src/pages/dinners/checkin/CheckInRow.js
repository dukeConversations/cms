import React, { Component } from "react";
import { Button } from "reactstrap";

export default class CheckInRow extends Component {
  onClickAction = () => {
    this.props.onClickHandler(this.props.application.id);
  };

  render() {
    let application = this.props.application;

    let checkInButton = application.present ? (
      <Button color="danger" onClick={this.onClickAction}>
        Mark as Absent
      </Button>
    ) : (
      <Button color="success" onClick={this.onClickAction}>
        Mark as Present
      </Button>
    );
    return (
      <tr>
        <td className="text-left align-middle">
          {application.student.firstName + " " + application.student.lastName}
          <br />
          <a href={"tel:" + application.student.phoneNumber}>
            {application.student.phoneNumber}
          </a>
        </td>
        <td className="text-right align-middle">{checkInButton}</td>
      </tr>
    );
  }
}
