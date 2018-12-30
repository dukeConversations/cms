import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import API from "duke-convos-api";
import * as USERS_API from "../../api";
import { Button } from "reactstrap";
import DeleteControl from "../../DeleteModalControl";

export default class DinnerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professor: null,
      user: null
    };
  }

  delete = () => {
    API.deleteDinner(
      this.props.dinner.id,
      professor => {},
      // an error is returned
      error => {
        console.error(error);
      }
    );
  };

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
        <td className="text-center">
          <div className="d-inline-flex">
            <span className="align-middle">
              <NavLink to={"/dinners/s/" + dinner.id}>
                <Button color="link">S</Button>
              </NavLink>{" "}
              |{" "}
            </span>
            <span className="align-middle">
              <NavLink to={"/dinners/v/" + dinner.id}>
                <Button color="link">V</Button>
              </NavLink>{" "}
              |{" "}
            </span>
            <span className="align-middle">
              <NavLink to={"/dinners/e/" + dinner.id}>
                <Button color="link">E</Button>
              </NavLink>
              |{" "}
            </span>
            <DeleteControl
              modalTitle="Delete Dinner"
              buttonTitle="D"
              buttonColor="link"
              onClickAction={this.delete}
            />
          </div>
        </td>
      </tr>
    );
  }
}
