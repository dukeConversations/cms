import React, { Component } from "react";
import ProfessorRow from "./ProfessorRow";
import * as API from "duke-convos-api";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import ErrorView from "../../ErrorView";

export default class Professors extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      professors: [],
      error: null
    };
  }

  // When the component is added, fetch the professors and update state
  componentDidMount() {
    API.getProfessors(
      // the data is returned in professors
      professors => {
        this.setState({ error: null });
        this.setState({ professors: professors });
      },
      // an error is returned
      error => {
        this.setState({ error: error });
      }
    );
  }

  render() {
    // Generate a list of ProfessorRows from the array in state.professors
    const professorRows = this.state.professors.map(professor => {
      return <ProfessorRow key={professor.uniqueID} professor={professor} />;
    });

    let error = this.state.error;
    if (error !== null) {
      return <ErrorView error={error} />;
    }

    // Render the JSX
    return (
      <div>
        <h1>Professors</h1>
        <NavLink to={"/professors/c"}>Create</NavLink>
        <span> | </span>
        <Button color="link" type="button">
          Delete Selected
        </Button>

        <Table bordered responsive>
          {/* Create the header of the table */}
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Dinner Count</th>
              <th>Actions</th>
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
