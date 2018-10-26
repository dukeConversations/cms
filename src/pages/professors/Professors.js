import React, { Component } from "react";
import ProfessorRow from "./ProfessorRow";
import * as API from "duke-convos-api";
import { Table, Button } from "reactstrap";

export default class Professors extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      professors: []
    };
  }

  // When the component is added, fetch the professors and update state
  componentDidMount() {
    API.getProfessors(
      // the data is returned in professors
      professors => {
        this.setState({ professors: professors });
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  }

  render() {
    // Generate a list of ProfessorRows from the array in state.professors
    const professorRows = this.state.professors.map(professor => {
      return <ProfessorRow key={professor.uniqueID} professor={professor} />;
    });

    // Render the JSX
    return (
      <div>
        <h1>Professors</h1>
        <Button color="link" type="button">
          Create
        </Button>
        <span> | </span>
        <Button color="link" type="button">
          Delete Selected
        </Button>

        <Table bordered responsive>
          {/* Create the header of the table */}
          <thead className="thead-dark">
            <tr>
              <th>Blah</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Dinner Count</th>
            </tr>
          </thead>
          <tbody>
            {/* Add the rows to represent each professor */}
            {professorRows}
          </tbody>
        </Table>
      </div>
    );
  }
}
