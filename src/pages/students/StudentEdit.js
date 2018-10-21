import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
import * as API from "../../api";

export default class StudentDetail extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      student: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    var studentObj = this.state.student;
    studentObj[evt.target.name] = evt.target.value;
    this.setState({ student: studentObj });
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

  onFormSubmit(event) {
    event.preventDefault();
  }

  render() {
    var student = this.state.student;

    if (student != null) {
      return (
        /*
        netID
        UniqueID
        first_name
        last_name
        phone
        Major
        gender_pronouns
          takes an int and maps to a set of pronouns
          ex. 1 => “he/his/him”
        grad_year
          Only 2 ints
          ex. Class of 2019 = 19, Class of 2021 = 21...etc.

        */
        <form onSubmit={this.onFormSubmit}>
          <Container>
            <Row className="my-2">
              <Col className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Johnny"
                  value={this.state.student.firstName}
                  onChange={this.handleChange}
                />
              </Col>
              <Col className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  placeholder="Appleseed"
                  value={this.state.student.lastName}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col className="form-group col-3">
                <label htmlFor="netID">Net ID</label>
                <input
                  className="form-control"
                  type="text"
                  name="netID"
                  id="netID"
                  placeholder="abc01"
                  value={this.state.student.netID}
                  onChange={this.handleChange}
                />
              </Col>
              <Col className="form-group col-3">
                <label htmlFor="uniqueID">Unique ID</label>
                <input
                  className="form-control"
                  type="text"
                  name="uniqueID"
                  id="uniqueID"
                  placeholder="1234567"
                  value={this.state.student.uniqueID}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col className="form-group col-3">
                <label htmlFor="phone">Phone</label>
                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  placeholder="(123) 456-789"
                  value={this.state.student.phoneNumber}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <div className="form-group">
              <label htmlFor="major">Major</label>
              <select
                onChange={this.handleChange}
                value={this.state.student.major}
                name="major"
                className="form-control"
                id="major"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>33</option>
                <option>5</option>
              </select>
            </div>
            <input
              type="text"
              name="major"
              placeholder="Major"
              value={this.state.student.major}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="major"
              placeholder="Major"
              value={this.state.student.major}
              onChange={this.handleChange}
            />
          </Container>
        </form>
      );
    } else {
      return null;
    }
  }
}
