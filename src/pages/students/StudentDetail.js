import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
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

  render() {
    var student = this.state.student;

    if (student != null) {
      var name = student.firstName + " " + student.lastName;
      // Render the JSX
      return (
        <Container>
          <NavLink to={"/students/e/" + student.netID}>Edit</NavLink>
          <Row>Name: {name}</Row>
          <Row>
            Unique id: {student.uniqueID} | Net id: {student.netID}
          </Row>
          <div>Phone: {student.phoneNumber}</div>
          <div>Major: {student.major}</div>
          <div>Gender pronouns: {student.phone}</div>
          <div>Grad year: {student.graduationYear}</div>
          <div># of applications: {student.numApps}</div>
          <div># of selections: {student.numSelections}</div>
          <div># of applications this semester: {student.semesterApps}</div>
          <div># of selections this semester: {student.semesterDins}</div>
        </Container>
      );
    } else {
      return null;
    }
  }
}
