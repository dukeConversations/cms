import React, { Component } from "react";
import DinnerItem from "./DinnerItem";
import * as API from "../../api";
import { Table, Button } from "reactstrap";

export default class Dinners extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      dinners: [],
      checkedAll: false
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
    // Generate a list of DinnerItems from the array in state.dinners
    const dinnerListItems = this.state.dinners.map(dinner => {
      return <DinnerItem dinner={dinner} key={dinner.url} />;
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
              <th>
                <input
                  type="checkbox"
                  checked={this.state.checkedAll}
                  onChange={this.toggleCheckedAll}
                />
              </th>
              <th>id</th>
              <th>topic</th>
              <th>professor</th>
              <th>user</th>
              <th>date</th>
              <th>address</th>
              <th># of apps</th>
              <th>invite sent</th>
              <th>invite response</th>
              <th>catering</th>
              <th>transportation</th>
            </tr>
          </thead>
          <tbody>
            {/* Add the rows to represent each dinner */}
            {dinnerListItems}
          </tbody>
        </Table>
      </div>
    );
  }
}
