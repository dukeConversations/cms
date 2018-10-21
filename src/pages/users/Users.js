import React, { Component } from "react";
import UserRow from "./UserRow";
import * as API from "../../api";
import { Table, Button } from "reactstrap";

export default class Users extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  // When the component is added, fetch the users and update state
  componentDidMount() {
    API.getUsers(
      // the data is returned in users
      users => {
        this.setState({ users: users });
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  }

  render() {
    // Generate a list of UserRows from the array in state.users
    const userRows = this.state.users.map(user => {
      return <UserRow key={user.uniqueID} user={user} />;
    });

    // Render the JSX
    return (
      <div>
        <h1>Users</h1>
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
              <th>blah</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Dinner Count</th>
              <th>Semester Dinner Count</th>
            </tr>
          </thead>
          <tbody>
            {/* Add the rows to represent each user */}
            {userRows}
          </tbody>
        </Table>
      </div>
    );
  }
}