import React, { Component } from "react";
import UserRow from "./UserRow";
import * as API from "duke-convos-api";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import ErrorView from "../../ErrorView";

export default class Users extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      users: [],
      error: null
    };
  }

  // When the component is added, fetch the users and update state
  componentDidMount() {
    API.getUsers(
      // the data is returned in users
      users => {
        this.setState({ error: null });
        this.setState({ users: users });
      },
      // an error is returned
      error => {
        console.log(error);
        this.setState({ error: error });
      }
    );
  }

  render() {
    // Generate a list of UserRows from the array in state.users
    const userRows = this.state.users.map(user => {
      return <UserRow key={user.id} user={user} />;
    });

    let error = this.state.error;
    if (error !== null) {
      return <ErrorView error={error} />;
    }

    // Render the JSX
    return (
      <div>
        <h1>Users</h1>
        <NavLink to={"/users/c"}>Create</NavLink>

        <Table bordered responsive>
          {/* Create the header of the table */}
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Dinner Count</th>
              <th>Actions</th>
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
