import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import * as API from "duke-convos-api";
import { NavLink } from "react-router-dom";
import moment from "moment";

export default class DinnerDetail extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      dinner: null
    };
  }

  // When the component is added, fetch the dinner and update state
  componentDidMount() {
    API.getDinner(
      this.props.match.params.id,
      // the data is returned in dinner
      dinner => {
        this.setState({ dinner: dinner });
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  }

  innerRenderLabel = (id, labelName, value) => {
    return (
      <div>
        <label htmlFor={id}>
          <strong>{labelName}</strong>
        </label>
        <br />
        <label className="property-label" id={id}>
          {value}
        </label>
      </div>
    );
  };

  renderLabel = (id, labelName) => {
    return this.innerRenderLabel(
      id,
      labelName,
      this.state.dinner[id].toString()
    );
  };

  renderProfessor = () => {
    let professor = this.state.dinner.professor;
    if (professor != null) {
      let professorName = professor.firstName + " " + professor.lastName;
      return (
        <div>
          <label htmlFor="professorButton">
            <strong>Professor</strong>
          </label>
          <br />
          <NavLink to={"/professors/v/" + professor.id} id="professorButton">
            {professorName}
          </NavLink>
        </div>
      );
    } else {
      return this.innerRenderLabel("professor", "Professor", "Loading...");
    }
  };

  renderUser = () => {
    let dinner = this.state.dinner;
    if (dinner.userID !== -1) {
      let userName = dinner.user.firstName + " " + dinner.user.lastName;
      return (
        <div>
          <label htmlFor="userButton">
            <strong>User</strong>
          </label>
          <br />
          <NavLink to={"/users/v/" + dinner.userID} id="userButton">
            {userName}
          </NavLink>
        </div>
      );
    } else {
      return this.innerRenderLabel("user", "User", "No user assigned");
    }
  };

  renderDate = (id, labelName) => {
    let unixDate = this.state.dinner[id];
    let date = moment.unix(unixDate);
    var dateString = date.isValid() ? date.format("MM/DD/YY h:mm a") : unixDate;
    return this.innerRenderLabel(id, labelName, dateString);
  };

  render() {
    let nullObj = {};
    console.log(nullObj === null);
    var dinner = this.state.dinner;

    if (dinner != null) {
      return (
        <Container>
          <NavLink to={"/dinners/e/" + dinner.id}>Edit</NavLink>
          <Row className="my-2">
            <Col className="form-group col-1">
              {this.renderLabel("id", "ID")}
            </Col>
            <Col className="form-group col-3">{this.renderProfessor()}</Col>
            <Col className="form-group col-3">{this.renderUser()}</Col>
            <Col className="form-group">
              {this.renderLabel("topic", "Topic")}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group">
              {this.renderLabel("description", "Description")}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-2">
              {this.renderDate("timeStamp", "Date")}
            </Col>
            <Col className="form-group col-3">
              {this.renderLabel("address", "Address")}
            </Col>
            <Col className="form-group col-3">
              {this.renderDate(
                "invitationSentTimeStamp",
                "Invitation sent date"
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-2">
              {this.renderLabel("studentLimit", "Student limit")}
            </Col>
            <Col className="form-group col-3">
              {this.renderLabel("dietaryRestrictions", "Dietary Restrictions")}
            </Col>
            <Col className="form-group col-1">
              {this.renderLabel("catering", "Catering")}
            </Col>
            <Col className="form-group col-1">
              {this.renderLabel("transportation", "Tansportation")}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group">
              <label>
                <strong>
                  {this.state.dinner.applications.length + " Applications"}
                </strong>
              </label>
              <br />
              <NavLink to={"/dinners/s/" + dinner.id}>Make Selections</NavLink>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return null;
    }
  }
}
