import React, { Component } from "react";
import DinnerRow from "./DinnerRow";
import * as API from "duke-convos-api";
import { Table, Button } from "reactstrap";

export default class Dinners extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      dinners: []
    };
  }

  // When the component is added, fetch the dinners and update state
  componentDidMount() {
    API.getDinners(
      // the data is returned in dinners
      dinners => {
        this.setState({ dinners: dinners });
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  }

  render() {
    // Generate a list of DinnerRows from the array in state.dinners
    const dinnerRows = this.state.dinners.map(dinner => {
      return <DinnerRow key={dinner.id} dinner={dinner} />;
    });

    // Render the JSX
    return (
      <div>
        <h1>Dinners</h1>
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
              <th>id</th>
              <th>Professor</th>
              <th>User</th>
              <th>Date/Time</th>
              <th>Catering</th>
              <th>Transportation</th>
            </tr>
          </thead>
          <tbody>
            {/* Add the rows to represent each dinner */}
            {dinnerRows}
          </tbody>
        </Table>
      </div>
    );
  }
}
