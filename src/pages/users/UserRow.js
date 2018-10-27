import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class UserRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var user = this.props.user;

    return (
      <tr>
        <td>
          <NavLink to={"/users/v/" + user.netID}>View</NavLink>
        </td>
        <td>
          <NavLink to={"/users/e/" + user.netID}>Edit</NavLink>
        </td>
        <td className="text-left">{user.firstName}</td>
        <td className="text-left">{user.lastName}</td>
        <td className="text-left">{user.role}</td>
        <td className="text-left">{user.dinners}</td>
        <td className="text-left">{user.semesterDins}</td>
      </tr>
    );
  }
}
