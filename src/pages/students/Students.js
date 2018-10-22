import React, { Component } from "react";
import StudentRow from "./StudentRow";
import * as API from "../../api";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

export default class Students extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      students: []
    };
  }

  // When the component is added, fetch the students and update state
  componentDidMount() {
    API.getStudents(
      // the data is returned in students
      students => {
        this.setState({ students: students });
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  }

  render() {
    // Generate a list of StudentRows from the array in state.students
    const studentRows = this.state.students.map(student => {
      return <StudentRow key={student.netID} student={student} />;
    });

    // Render the JSX
    return (
      <div>
        <h1>Students</h1>
        <NavLink to={"/students/c"}>Create</NavLink>
        <span> | </span>
        <Button color="link" type="button">
          Delete Selected
        </Button>

        <Table bordered responsive>
          {/* Create the header of the table */}
          <thead className="thead-dark">
            <tr>
              <th> </th>
              <th> </th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>NetID</th>
              <th>Class</th>
              <th>Overall Acceptance %</th>
              <th>Semester Acceptance %</th>
            </tr>
          </thead>
          <tbody>
            {/* Add the rows to represent each student */}
            {studentRows}
          </tbody>
        </Table>
      </div>
    );
  }
}
