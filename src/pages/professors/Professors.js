import React, { Component } from "react";
import ProfessorItem from "./ProfessorItem";
import * as API from "../../api";
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
    // Generate a list of ProfessorItems from the array in state.professors
    const professorListItems = this.state.professors.map(professor => {
      return <ProfessorItem professor={professor} key={professor.url} />;
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
              <th>
                <input type="checkbox" />
              </th>
              <th>id</th>
              <th>first name</th>
              <th>last name</th>
              <th>gender pronouns</th>
              <th>department</th>
              <th>title</th>
              <th>dinner count</th>
              <th>school</th>
            </tr>
          </thead>
          <tbody>
            {/* Add the rows to represent each professor */}
            {professorListItems}
          </tbody>
        </Table>
      </div>
    );
  }
}
