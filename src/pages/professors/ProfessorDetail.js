import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
import * as API from "duke-convos-api";

export default class ProfessorDetail extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      professor: null
    };
  }

  // When the component is added, fetch the professor and update state
  componentDidMount() {
    API.getProfessor(
      this.props.match.params.id,
      // the data is returned in professor
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
    var professor = this.state.professor;

    if (professor != null) {
      // Render the JSX
      return (
        <Container>
          <Row>Professor stuffff</Row>
        </Container>
      );
    } else {
      return (
        <Container>
          <Row>Professor null</Row>
        </Container>
      );
    }
  }
}
