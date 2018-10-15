import React, { Component } from "react";
import { Button, Label, Row } from "reactstrap";
import moment from "moment";
import { Route, NavLink, HashRouter } from "react-router-dom";
import * as API from "../../api";

export default class DinnerItem extends Component {
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
      this.props.dinner.professorId,
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
    var date = moment
      .unix(this.props.dinner.timestamp)
      .format("MMMM Do YYYY, h:mm:ss a");

    var inviteSentDate = moment
      .unix(this.props.dinner.invitationSent)
      .format("MMMM Do YYYY, h:mm:ss a");

    var userString = this.props.dinner.userId;
    var user = this.state.user;
    if (user !== null) {
      userString = user.firstName + " " + user.lastName;
    }
    var professor = this.state.professor;
    var professorString = this.props.dinner.professorId;
    if (professor !== null) {
      professorString = professor.firstName + " " + professor.lastName;
    }

    return (
      <tr>
        <td>
          <input type="checkbox" />
        </td>
        <td className="text-left">{this.props.dinner.id}</td>
        <td className="text-left">{this.props.dinner.topic}</td>
        <td className="text-left">
          <Button color="link">{professorString}</Button>
        </td>
        <td className="text-left">
          <NavLink to={"/users/" + this.props.dinner.userId}>
            {userString}
          </NavLink>
        </td>
        <td className="text-left">{date}</td>
        <td className="text-left">{this.props.dinner.address}</td>
        <td className="text-left">{this.props.dinner.numApps}</td>
        <td className="text-left">{inviteSentDate}</td>
        <td className="text-left">{this.props.dinner.invitationResponse}</td>
        <td className="text-left">{this.props.dinner.catering}</td>
        <td className="text-left">{this.props.dinner.transportation}</td>
      </tr>
    );
  }
}
