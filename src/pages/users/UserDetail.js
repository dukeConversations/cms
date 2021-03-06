import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import * as API from "duke-convos-api";
import Dicts from "../../dictionaries";
import ErrorView from "../../ErrorView";

// To allow reroute to the user's profile information
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";

export default class UserDetail extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      user: null,
      error: null
    };
  }

  // When the component is added, fetch the user and update state
  componentDidMount() {
    API.getUser(
      this.props.match.params.id,
      // the data is returned in user
      user => {
        this.setState({ error: null });
        this.setState({ user: user });
      },
      // an error is returned
      error => {
        this.setState({ error: error });
      }
    );
  }

  render() {
    var user = this.state.user;

    // Render the JSX
    if (user != null) {
      var name = user.firstName + " " + user.lastName;

      var roleLabel = null;
      switch (user.role) {
        case 0:
          roleLabel = (
            <span
              className="badge badge-pill badge-primary"
              style={{ verticalAlign: "middle" }}
            >
              Super Admin
            </span>
          );
          break;
        case 1:
          roleLabel = (
            <span
              className="badge badge-pill badge-success"
              style={{ verticalAlign: "middle", fontSize: "em" }}
            >
              Exec
            </span>
          );
          break;
        case 2:
          roleLabel = (
            <span className="badge badge-pill badge-secondary">
              Conversationalist
            </span>
          );
          break;
        default:
          roleLabel = (
            <span className="badge badge-pill badge-secondary">
              Unknown Role
            </span>
          );
          break;
      }

      let error = this.state.error;
      if (error !== null) {
        return <ErrorView error={error} />;
      } else {
        return (
          <Container>
            <Row>
              <Col>
                <h2>{name}</h2>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="col-3">{roleLabel}</Col>
            </Row>
            <Row>
              <Col className="col-3">Unique id: {user.uniqueID}</Col>
              <Col className="col-3">Net id: {user.netID}</Col>
            </Row>
            <div>Phone: {user.phone}</div>
            <div>Major: {Dicts.getMajor(user.major)}</div>
            <div># of dinners: {user.dinnerCount}</div>
            <div># of dinners this semester: {user.semDinnerCount}</div>
            <div>email text: {user.emailText}</div>
            <div>picture id: {user.pictureId}</div>

            <NavLink to={"/users/e/" + user.id}>
              <Button color="link">E</Button>
            </NavLink>
          </Container>
        );
      }
    } else {
      return null;
    }
  }
}
