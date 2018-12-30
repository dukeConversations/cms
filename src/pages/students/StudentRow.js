import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import DeleteControl from "../../DeleteModalControl";
import API from "duke-convos-api";

export default class StudentRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  delete = () => {
    API.deleteStudent(
      this.props.student.netID,
      // the data is returned in student
      student => {
        console.log(student);
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  };

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
        <td className="text-left">
          {student.firstName + " " + student.lastName}
        </td>
        <td className="text-left">{student.netID}</td>
        <td className="text-left">{student.graduationYear}</td>
        <td className="text-left">{totalPercentString}</td>
        <td className="text-left">{semesterPercentString}</td>
        <td className="text-center">
          <div className="d-inline-flex">
            <span className="align-middle">
              <NavLink to={"/students/v/" + student.netID}>
                <Button color="link">V</Button>
              </NavLink>{" "}
              |{" "}
            </span>
            <span className="align-middle">
              <NavLink to={"/students/e/" + student.netID}>
                <Button color="link">E</Button>
              </NavLink>
              |{" "}
            </span>
            <DeleteControl
              modalTitle="Delete Student"
              buttonTitle="D"
              buttonColor="link"
              onClickAction={this.delete}
            />
          </div>
        </td>
      </tr>
    );
  }
}
