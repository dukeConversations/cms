import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
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
        console.log(professor);
        this.setState({ professor: professor });
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
    return this.innerRenderLabel(id, labelName, this.state.professor[id]);
  };

  render() {
    var professor = this.state.professor;

    let departments = {
      0: "Computer Science",
      1: "Neuro Science",
      2: "Political Science",
      3: "Public Policy"
    };

    let schools = {
      0: "Pratt",
      1: "Trinity"
    };

    let genderPronouns = { 0: "He, Him", 1: "She, Her", 2: "They, Them" };

    if (professor != null) {
      // Render the JSX
      return (
        <Container>
          <NavLink to={"/professors/e/" + professor.uniqueID}>Edit</NavLink>
          <Row className="my-2">
            <Col className="form-group col-3">
              {this.renderLabel("firstName", "First Name")}
            </Col>
            <Col className="form-group col-3">
              {this.renderLabel("lastName", "Last Name")}
            </Col>
            <Col className="form-group col-3">
              {this.renderLabel("uniqueID", "Unique ID")}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-3">
              {this.innerRenderLabel(
                "genderPronouns",
                "Gender Pronouns",
                genderPronouns[this.state.professor["genderPronouns"]]
              )}
            </Col>
            <Col className="form-group col-4">
              {this.renderLabel("email", "Email")}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group">
              {this.renderLabel("title", "Title")}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-6">
              {this.innerRenderLabel(
                "department",
                "Department",
                departments[this.state.professor["department"]]
              )}
            </Col>
            <Col className="form-group col-3">
              {this.innerRenderLabel(
                "school",
                "School",
                schools[this.state.professor["school"]]
              )}
            </Col>
          </Row>
        </Container>
      );
    } else {
      return null;
    }
  }
}
