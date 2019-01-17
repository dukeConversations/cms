import React, { Component } from "react";
import StudentRow from "./StudentRow";
import * as API from "duke-convos-api";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import ErrorView from "../../ErrorView";

export default class Students extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      students: [],
      error: null
    };
  }

  // When the component is added, fetch the students and update state
  componentDidMount() {
    API.getStudents(
      // the data is returned in students
      students => {
        this.setState({ error: null });
        this.setState({ students: students });
      },
      // an error is returned
      error => {
        this.setState({ error: error });
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
        {this.state.error !== null && <ErrorView error={this.state.error} />}
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
              <th>Name</th>
              <th>NetID</th>
              <th>Class</th>
              <th>Overall Acceptance %</th>
              <th>Semester Acceptance %</th>
              <th>Actions</th>
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
