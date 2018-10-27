import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class ProfessorRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var professor = this.props.professor;
    return (
      <tr>
        <td>
          <NavLink to={"/professors/v/" + professor.uniqueID}>View</NavLink>
        </td>
        <td>
          <NavLink to={"/professors/e/" + professor.uniqueID}>Edit</NavLink>
        </td>
        <td className="text-left">{professor.firstName}</td>
        <td className="text-left">{professor.lastName}</td>
        <td className="text-left">{professor.department}</td>
        <td className="text-left">{professor.dinnerCount}</td>
      </tr>
    );
  }
}
