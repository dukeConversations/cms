import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import * as API from "duke-convos-api";
import Dicts from "../../dictionaries";
import ErrorView from "../../ErrorView";

export default class ProfessorDetail extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      professor: null,
      error: null
    };
  }

  // When the component is added, fetch the professor and update state
  componentDidMount() {
    API.getProfessor(
      this.props.match.params.id,
      // the data is returned in professor
      professor => {
        this.setState({ error: null });
        this.setState({ professor: professor });
      },
      // an error is returned
      error => {
        this.setState({ error: error });
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
    let error = this.state.error;
    if (error !== null) {
      return <ErrorView error={error} />;
    }

    var professor = this.state.professor;
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
                Dicts.getGenderPronouns(professor.genderPronouns)
              )}
            </Col>
            <Col className="form-group col-4">
              <div>
                <label htmlFor="professor">
                  <strong>Email</strong>
                </label>
                <br />
                <Button
                  className="property-label"
                  color="link"
                  id="professor"
                  href={"mailto:" + this.state.professor.email}
                >
                  {this.state.professor.email}
                </Button>
              </div>
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
                Dicts.getDepartment([this.state.professor["department"]])
              )}
            </Col>
            <Col className="form-group col-3">
              {this.innerRenderLabel(
                "school",
                "School",
                Dicts.getSchool([this.state.professor["school"]])
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
