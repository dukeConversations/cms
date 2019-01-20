import React, { Component } from "react";
import DinnerRow from "./DinnerRow";
import * as API from "duke-convos-api";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import ErrorView from "../../ErrorView";

export default class Dinners extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      dinners: [],
      error: null
    };
  }

  // When the component is added, fetch the dinners and update state
  componentDidMount() {
    API.getDinners(
      // the data is returned in dinners
      dinners => {
        this.setState({ error: null });
        this.setState({ dinners: dinners });
      },
      // an error is returned
      error => {
        this.setState({ error: error });
      }
    );
  }

  refreshPage = () => {
    this.componentDidMount();
  };

  render() {
    // Generate a list of DinnerRows from the array in state.dinners
    const dinnerRows = this.state.dinners.map(dinner => {
      return (
        <DinnerRow
          key={dinner.id}
          dinner={dinner}
          forceRender={this.refreshPage}
        />
      );
    });

    let error = this.state.error;
    if (error !== null) {
      return <ErrorView error={error} />;
    }

    // Render the JSX
    return (
      <div>
        <h1>Dinners</h1>
        <NavLink to={"/dinners/c"}>Create</NavLink>

        <Table bordered responsive>
          {/* Create the header of the table */}
          <thead className="thead-dark">
            <tr>
              <th>id</th>
              <th>Professor</th>
              <th>User</th>
              <th>Date/Time</th>
              <th>Catering</th>
              <th>Trans.</th>
              <th>Actions</th>
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
