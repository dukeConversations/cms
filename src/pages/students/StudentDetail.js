import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import * as API from "duke-convos-api";

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

  renderLabel = (id, labelName) => {
    return (
      <div>
        <label htmlFor={id}>
          <strong>{labelName}</strong>
        </label>
        <br />
        <label className="property-label" id={id}>
          {this.state.student[id]}
        </label>
      </div>
    );
  };

  render() {
    var student = this.state.student;

    // var majors = [0, 1, 2, 3, 4, 5, 6, 7];
    //
    // var gradYears = [2019, 2020, 2021, 2022];
    //
    // var genderPronouns = [0, 1, 2, 3, 4];

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
              {this.renderLabel("major", "Major")}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-2">
              {this.renderLabel("graduationYear", "Graduation Year")}
            </Col>
            <Col className="form-group col-3">
              {this.renderLabel("genderPronouns", "Gender Pronouns")}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="col-2">
              <Button onClick={this.cancel}>Cancel</Button>
            </Col>
            <Col className="col-2">
              <Button onClick={this.submit}>Submit</Button>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return null;
    }
  }
}
