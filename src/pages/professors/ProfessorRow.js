import React, { Component } from "react";

export default class ProfessorRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var prof = this.props.professor;
    return (
      <tr>
        <td className="text-left">{prof.firstName}</td>
        <td className="text-left">{prof.lastName}</td>
        <td className="text-left">{prof.department}</td>
        <td className="text-left">{prof.dinnerCount}</td>
      </tr>
    );
  }
}
