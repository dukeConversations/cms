import React, { Component } from "react";

export default class ErrorView extends Component {
  render() {
    let error = this.props.error;
    return (
      <div>
        {"Error"}
        <br />
        If the error is authentication, please re-authenticate in the top right
        of the screen. If you're trying to load something, reload the page. If
        you're trying to save something, just try again after authenticating.
        <br />
        <br />
      </div>
    );
  }
}
