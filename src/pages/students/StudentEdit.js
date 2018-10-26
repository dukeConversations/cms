import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
import * as API from "duke-convos-api";
import Validator from "../../validator";
import * as Rules from "../../rules";

export default class StudentDetail extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      student: null,
      showErrors: false,
      validationErrors: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validateFields = () => {
    let studentObj = this.state.student;

    let validator = new Validator(studentObj);

    validator.validate("firstName", true);
    validator.validate("lastName", true);
    validator.validate("netID", true);
    validator.validate("uniqueID", true);
    validator.validate("phoneNumber", true, [Rules.isPhoneNumber]);
    validator.validate("major", true);
    validator.validate("genderPronouns", true);
    validator.validate("graduationYear", true);

    let errorsDict = validator.errorsDict;
    this.setState({ validationErrors: errorsDict });

    return Object.keys(errorsDict).length === 0;
  };

  showError = field => {
    return (
      this.state.validationErrors.hasOwnProperty(field) && this.state.showErrors
    );
  };

  handleChange(evt) {
    var studentObj = this.state.student;
    studentObj[evt.target.name] = evt.target.value;
    this.setState({ student: studentObj });
    if (this.state.showErrors) this.validateFields();
  }

  // When the component is added, fetch the student and update state
  componentDidMount() {
    console.log(this.props);
    if (!this.props.isCreating) {
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
    } else {
      this.setState({
        student: {}
      });
    }
  }

  submit = () => {
    this.setState({ showErrors: true });
    let valid = this.validateFields();
    if (valid) {
      // submit and go to last page
    }
  };

  cancel = () => {
    this.props.history.goBack();
  };

  render() {
    var student = this.state.student;

    var majors = [
      "Computer Science",
      "Economics",
      "Public Policy",
      "Biomedical Engineering"
    ];

    var gradYears = ["2019", "2020", "2021", "2022"];

    var genderPronouns = [
      "He, Him, His",
      "She, Her, Hers",
      "They, Them, Theirs"
    ];

    if (student != null) {
      const majorOptions = majors.map(major => {
        return <option key={major}>{major}</option>;
      });

      const gradYearOptions = gradYears.map(year => {
        return <option key={year}>{year}</option>;
      });

      const genderPronounOptions = genderPronouns.map(genderPronoun => {
        return <option key={genderPronoun}>{genderPronoun}</option>;
      });

      return (
        <Container>
          <Row className="my-2">
            <Col className="form-group col-4">
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
              <label
                className="errorLabel"
                htmlFor="firstName"
                hidden={!this.showError("firstName")}
              >
                {this.state.validationErrors["firstName"]}
              </label>
            </Col>
            <Col className="form-group col-4">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                placeholder="Appleseed"
                value={this.state.student.lastName}
                onChange={this.handleChange}
              />
              <label
                className="errorLabel"
                htmlFor="lastName"
                hidden={!this.showError("lastName")}
              >
                {this.state.validationErrors["lastName"]}
              </label>
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
              <label
                className="errorLabel"
                htmlFor="netID"
                hidden={!this.showError("netID")}
              >
                {this.state.validationErrors["netID"]}
              </label>
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
              <label
                className="errorLabel"
                htmlFor="uniqueID"
                hidden={!this.showError("uniqueID")}
              >
                {this.state.validationErrors["uniqueID"]}
              </label>
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-2">
              <label htmlFor="phoneNumber">Phone</label>
              <input
                className="form-control"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="(123) 456-789"
                value={this.state.student.phoneNumber}
                onChange={this.handleChange}
              />
              <label
                className="errorLabel"
                htmlFor="phoneNumber"
                hidden={!this.showError("phoneNumber")}
              >
                {this.state.validationErrors["phoneNumber"]}
              </label>
            </Col>
            <Col className="form-group col-4">
              <label htmlFor="major">Major</label>
              <select
                onChange={this.handleChange}
                value={this.state.student.major}
                name="major"
                className="form-control"
                id="major"
              >
                {majorOptions}
              </select>
              <label
                className="errorLabel"
                htmlFor="major"
                hidden={!this.showError("major")}
              >
                {this.state.validationErrors["major"]}
              </label>
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-2">
              <label htmlFor="graduationYear">Graduation Year</label>
              <select
                onChange={this.handleChange}
                value={this.state.student.graduationYear}
                name="graduationYear"
                className="form-control"
                id="graduationYear"
              >
                {gradYearOptions}
              </select>
              <label
                className="errorLabel"
                htmlFor="graduationYear"
                hidden={!this.showError("graduationYear")}
              >
                {this.state.validationErrors["graduationYear"]}
              </label>
            </Col>
            <Col className="form-group col-3">
              <label htmlFor="genderPronouns">Gender Pronouns</label>
              <select
                onChange={this.handleChange}
                value={this.state.student.genderPronouns}
                name="genderPronouns"
                className="form-control"
                id="genderPronouns"
              >
                {genderPronounOptions}
              </select>
              <label
                className="errorLabel"
                htmlFor="genderPronouns"
                hidden={!this.showError("genderPronouns")}
              >
                {this.state.validationErrors["genderPronouns"]}
              </label>
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
