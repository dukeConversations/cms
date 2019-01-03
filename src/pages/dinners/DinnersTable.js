import React, { Component } from "react";
import DinnerRow from "./DinnerRow";
import { Table } from "reactstrap";

export default class DinnersTable extends Component {
  render() {
    // Generate a list of DinnerRows from the array in state.dinners
    const dinnerRows = this.props.dinners.map(dinner => {
      return (
        <DinnerRow
          key={dinner.id}
          dinner={dinner}
          rowType={this.props.rowType}
        />
      );
    });

    if (this.props.dinners.length === 0) {
      return <div>No data to display here yet</div>;
    } else {
      return (
        <Table bordered responsive>
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
          <tbody>{dinnerRows}</tbody>
        </Table>
      );
    }
  }
}
