import React, { Component } from "react";
import { Button } from "reactstrap";

export default class CheckInRow extends Component {
  onClickAction = () => {
    this.props.onClickHandler(this.props.dinnerID);
  };

  render() {
    return (
      <div>
        <div>{this.props.status}</div>
        <Button onClick={this.onClickAction}>Toggle</Button>
      </div>
    );
  }
}
