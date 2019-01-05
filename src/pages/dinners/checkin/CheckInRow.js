import React, { Component } from "react";
import { Button } from "reactstrap";

export default class CheckInRow extends Component {
  onClickAction = () => {
    this.props.onClickHandler(this.props.applicationID);
  };

  render() {
    return (
      <tr>
        <td className="text-left align-middle">
          {this.props.status.toString()}
        </td>
        <td className="text-right align-middle">
          <Button onClick={this.onClickAction}>Toggle</Button>
        </td>
      </tr>
    );
  }
}
