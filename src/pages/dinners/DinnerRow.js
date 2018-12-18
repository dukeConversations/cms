import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import API from "duke-convos-api";

export default class DinnerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professor: null,
      user: null
    };
  }

  componentDidMount() {
    API.getUser(
      this.props.dinner.userId,
      // the data is returned
      user => {
        this.setState({ user: user });
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  }

  render() {
    var dinner = this.props.dinner;

    var date = moment.unix(dinner.timeStamp);
    var dateString = date.isValid()
      ? date.format("dddd, MMMM Do @ h:mm a")
      : dinner.timeStamp;

    var userString = dinner.userId;
    var user = this.state.user;
    user = null;

    let userCellContent;
    if (user !== null) {
      userString = user.firstName + " " + user.lastName;
      userCellContent = (
        <NavLink to={"/users/v/" + dinner.userId}>{userString}</NavLink>
      );
    } else {
      userCellContent = <div>No user assigned</div>;
    }

    var professorString = dinner.professorID;
    var professor = dinner.professor;
    if (professor != null) {
      professorString = professor.firstName + " " + professor.lastName;
    }

    var cateringString = dinner.catering ? "Yes" : "No";
    var transportationString = dinner.transportation ? "Yes" : "No";

    return (
      <tr>
        <td className="text-left align-middle">{dinner.id}</td>
        <td className="text-left align-middle">
          <NavLink to={"/professors/v/" + dinner.professorID}>
            {professorString}
          </NavLink>
        </td>
        <td className="text-left align-middle">{userCellContent}</td>
        <td className="text-left align-middle">{dateString}</td>
        <td className="text-left align-middle">{cateringString}</td>
        <td className="text-left align-middle">{transportationString}</td>
        <td className="align-middle">
          <NavLink to={"/dinners/s/" + dinner.id}>S</NavLink> |{" "}
          <NavLink to={"/dinners/v/" + dinner.id}>V</NavLink> |{" "}
          <NavLink to={"/dinners/e/" + dinner.id}>E</NavLink>
        </td>
      </tr>
    );
  }
}
