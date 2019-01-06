import React, { Component } from "react";
import { Button } from "reactstrap";

export default class CheckInRow extends Component {
  onClickAction = () => {
    this.props.onClickHandler(this.props.application.id);
  };

  render() {
    let application = this.props.application;

    let buttonText = application.present ? "Mark as Absent" : "Mark as Present";
    return (
      <tr>
        <td className="text-left align-middle">
          {application.student.firstName + " " + application.student.lastName}
        </td>
        <td className="text-right align-middle">
          <Button backgroundColor="red" onClick={this.onClickAction}>
            {buttonText}
          </Button>
        </td>
      </tr>
    );
  }
}
