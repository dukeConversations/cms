import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class StudentRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var student = this.props.student;
    var semesterPercentage = (
      (student.semesterDins / student.semesterApps) *
      100
    ).toFixed(0);
    var totalPercentage = (
      (student.numSelections / student.numApps) *
      100
    ).toFixed(0);

    var semesterPercentString =
      (isNaN(semesterPercentage) ? 0 : semesterPercentage) + "%";

    var totalPercentString =
      (isNaN(totalPercentage) ? 0 : totalPercentage) + "%";
    return (
      <tr>
        <td>
          <NavLink to={"/students/v/" + student.netID}>View</NavLink>
        </td>
        <td>
          <NavLink to={"/students/e/" + student.netID}>Edit</NavLink>
        </td>
        <td className="text-left">{student.firstName}</td>
        <td className="text-left">{student.lastName}</td>
        <td className="text-left">{student.netID}</td>
        <td className="text-left">{student.graduationYear}</td>
        <td className="text-left">{totalPercentString}</td>
        <td className="text-left">{semesterPercentString}</td>
      </tr>
    );
  }
}
