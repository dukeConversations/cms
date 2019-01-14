import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import * as API from "duke-convos-api";
import Dicts from "../../dictionaries";

export default class StudentDetail extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      student: null
    };
  }

  // When the component is added, fetch the student and update state
  componentDidMount() {
    API.getStudent(
      this.props.match.params.netID,
      // the data is returned in student
      student => {
        this.setState({ student: student });
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  }

  innerRenderLabel = (id, labelName, labelValue) => {
    return (
      <div>
        <label htmlFor={id}>
          <strong>{labelName}</strong>
        </label>
        <br />
        <label className="property-label" id={id}>
          {labelValue}
        </label>
      </div>
    );
  };

  cancel = () => {
    this.props.history.goBack();
  };

  renderLabel = (id, labelName) => {
    return this.innerRenderLabel(id, labelName, this.state.student[id]);
  };

  render() {
    var student = this.state.student;

    if (student != null) {
      return (
        <Container>
          <NavLink to={"/students/e/" + student.netID}>Edit</NavLink>
          <Row className="my-2">
            <Col className="form-group col-4">
              {this.renderLabel("firstName", "First Name")}
            </Col>
            <Col className="form-group col-4">
              {this.renderLabel("lastName", "Last Name")}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-3">
              {this.renderLabel("netID", "Net ID")}
            </Col>
            <Col className="form-group col-3">
              {this.renderLabel("uniqueID", "Unique ID")}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-2">
              {this.renderLabel("phoneNumber", "Phone")}
            </Col>
            <Col className="form-group col-4">
              {this.innerRenderLabel(
                "major",
                "Major",
                Dicts.getMajor(student.major)
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-2">
              {this.renderLabel("graduationYear", "Graduation Year")}
            </Col>
            <Col className="form-group col-3">
              {this.innerRenderLabel(
                "genderPronouns",
                "Gender Pronouns",
                Dicts.getMajor(student.genderPronouns)
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
