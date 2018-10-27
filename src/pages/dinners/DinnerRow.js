import React, { Component } from "react";
import { Button } from "reactstrap";
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

    API.getProfessor(
      this.props.dinner.professorID,
      // the data is returned
      professor => {
        this.setState({ professor: professor });
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

    var professorString = dinner.professorID;
    var professor = this.state.professor;
    if (professor != null) {
      professorString = professor.firstName + " " + professor.lastName;
    }

    var cateringString = dinner.catering ? "Yes" : "No";
    var transportationString = dinner.transportation ? "Yes" : "No";

    return (
      <tr>
        <td>
          <NavLink to={"/dinners/v/" + dinner.id}>View</NavLink>
        </td>
        <td>
          <NavLink to={"/dinners/e/" + dinner.id}>Edit</NavLink>
        </td>
        <td className="text-left">{dinner.id}</td>
        <td className="text-left">
          <NavLink to={"/professors/" + dinner.professorID}>
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
