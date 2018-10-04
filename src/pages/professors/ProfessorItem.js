import React, { Component } from "react";

export default class ProfessorItem extends Component {
  render() {
    return (
      <li>
        <h1>{this.props.professor.name}</h1>
      </li>
    );
  }
}
