import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import Dicts from "../../dictionaries";

export default class UserRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var user = this.props.user;
    var roleString = Dicts.getRole(user.role.toString());

    return (
      <tr>
        <td className="text-left">{user.firstName + " " + user.lastName}</td>
        <td className="text-left">{user.email}</td>
        <td className="text-left">{roleString}</td>
        <td className="text-left">{user.dinners.length}</td>
        <td className="text-center">
          <div className="d-inline-flex">
            <span className="align-middle">
              <NavLink to={"/users/v/" + user.id}>
                <Button color="link">V</Button>
              </NavLink>{" "}
              |{" "}
            </span>
            <span className="align-middle">
              <NavLink to={"/users/e/" + user.id}>
                <Button color="link">E</Button>
              </NavLink>
            </span>
          </div>
        </td>
      </tr>
    );
  }
}
