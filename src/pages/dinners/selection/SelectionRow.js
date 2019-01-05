import React, { Component } from "react";
import { Button } from "reactstrap";

export default class CheckInRow extends Component {
  onClickAction = status => {
    this.props.onClickHandler(this.props.application.id, status);
  };

  render() {
    let application = this.props.application;

    return (
      <tr>
        <td className="text-left align-middle">
          {this.props.application.status}
        </td>
        <td className="text-right align-middle">
          <Button onClick={() => this.onClickAction(1)}>Accept</Button>
        </td>
        <td className="text-right align-middle">
          <Button onClick={() => this.onClickAction(3)}>Waitlist</Button>
        </td>
        <td className="text-right align-middle">
          <Button onClick={() => this.onClickAction(0)}>Reject</Button>
        </td>
      </tr>
    );
  }
}
