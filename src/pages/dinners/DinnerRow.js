import React, { Component } from "react";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
import * as API from "../../api";

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
      ? date.format("MMMM Do YYYY, h:mm:ss a")
      : dinner.timeStamp;

    var userString = dinner.userId;
    var user = this.state.user;
    if (user !== null) {
      userString = user.firstName + " " + user.lastName;
    }

    var professor = dinner.professor;
    var professorString = professor.firstName + " " + professor.lastName;

    var cateringString = dinner.catering ? "Yes" : "No";
    var transportationString = dinner.transportation ? "Yes" : "No";

    return (
      <tr>
        <td className="text-left">{dinner.id}</td>
        <td className="text-left">
          <NavLink to={"/professors/" + professor.uniqueID}>
            {professorString}
          </NavLink>
        </td>
        <td className="text-left">
          <NavLink to={"/users/" + dinner.userId}>{userString}</NavLink>
        </td>
        <td className="text-left">{dateString}</td>
        <td className="text-left">{cateringString}</td>
        <td className="text-left">{transportationString}</td>
      </tr>
    );
  }
}
