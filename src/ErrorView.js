import React, { Component } from "react";

export default class ErrorView extends Component {
  render() {
    let error = this.props.error;
    return <div>{error.data.Message || "Error"}</div>;
  }
}
