import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as API from "duke-convos-api";
import Validator from "../../validator";
import * as Rules from "../../rules";
import DeleteControl from "../../DeleteModalControl";
import Dicts from "../../dictionaries";
import ErrorView from "../../ErrorView";

export default class StudentEdit extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      student: null,
      showErrors: false,
      validationErrors: {},
      error: null
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
    if (!this.props.isCreating) {
      API.getStudent(
        this.props.match.params.netID,
        // the data is returned in student
        student => {
          this.setState({ error: null });
          this.setState({ student: student });
        },
        // an error is returned
        error => {
          this.setState({ error: error });
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
      if (this.props.isCreating) {
        API.createStudent(
          this.state.student,
          // the data is returned in students
          student => {
            this.setState({ error: null });
            this.props.history.goBack();
          },
          // an error is returned
          error => {
            this.setState({ error: error });
          }
        );
      } else {
        API.updateStudent(
          this.state.student.netID,
          this.state.student,
          // the data is returned in student
          student => {
            this.setState({ error: null });
            this.props.history.goBack();
          },
          // an error is returned
          error => {
            this.setState({ error: error });
            //this.props.history.goBack();
          }
        );
      }
    }
  };

  delete = () => {
    API.deleteStudent(
      this.state.student.netID,
      // the data is returned in student
      student => {
        this.setState({ error: null });
        this.props.history.goBack();
      },
      // an error is returned
      error => {
        this.setState({ error: error });
      }
    );
  };

  cancel = () => {
    this.props.history.goBack();
  };

  renderInput = (inputId, inputName, inputField) => {
    return (
      <div>
        <label htmlFor={inputId}>{inputName}</label>
        {inputField}
        <label
          className="error-label"
          htmlFor={inputId}
          hidden={!this.showError(inputId)}
        >
          {this.state.validationErrors[inputId]}
        </label>
      </div>
    );
  };

  render() {
    var student = this.state.student;

    let majors = Dicts.majorsDict();

    let gradYears = Dicts.gradYears();

    let genderPronouns = Dicts.genderPronouns();

    if (student != null) {
      const majorOptions = Object.keys(majors).map(key => {
        return (
          <option key={key} value={key}>
            {majors[key]}
          </option>
        );
      });
      majorOptions.splice(
        0,
        0,
        <option key={majors.length} disabled>
          Make Selection
        </option>
      );

      const gradYearOptions = gradYears.map(year => {
        return (
          <option key={year} value={year}>
            {year}
          </option>
        );
      });
      gradYearOptions.splice(
        0,
        0,
        <option key={gradYears.length} disabled>
          Make Selection
        </option>
      );

      const genderPronounOptions = Object.keys(genderPronouns).map(key => {
        return (
          <option key={key} value={key}>
            {genderPronouns[key]}
          </option>
        );
      });
      genderPronounOptions.splice(
        0,
        0,
        <option key={genderPronouns.length} disabled>
          Make Selection
        </option>
      );

      return (
        <Container>
          {this.state.error !== null && <ErrorView error={this.state.error} />}
          <Row className="my-2">
            <Col className="form-group col-xs-12 col-md-4">
              {this.renderInput(
                "firstName",
                "First Name",
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Johnny"
                  value={this.state.student.firstName || ""}
                  onChange={this.handleChange}
                />
              )}
            </Col>
            <Col className="form-group col-xs-12 col-md-4">
              {this.renderInput(
                "lastName",
                "Last Name",
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Appleseed"
                  value={this.state.student.lastName || ""}
                  onChange={this.handleChange}
                />
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-xs-12 col-md-3">
              {this.renderInput(
                "netID",
                "Net ID",
                <input
                  className="form-control"
                  type="text"
                  name="netID"
                  id="netID"
                  disabled={!this.props.isCreating}
                  placeholder="abc01"
                  value={this.state.student.netID || ""}
                  onChange={this.handleChange}
                />
              )}
            </Col>
            <Col className="form-group col-xs-11 col-md-3">
              {this.renderInput(
                "uniqueID",
                "Unique ID",
                <input
                  className="form-control"
                  type="text"
                  name="uniqueID"
                  id="uniqueID"
                  placeholder="1234567"
                  value={this.state.student.uniqueID || ""}
                  onChange={this.handleChange}
                />
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-xs-12 col-md-6">
              {this.renderInput(
                "phoneNumber",
                "Phone",
                <input
                  className="form-control"
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="(123) 456-789"
                  value={this.state.student.phoneNumber || ""}
                  onChange={this.handleChange}
                />
              )}
            </Col>
            <Col className="form-group col-xs-12 col-md-6">
              {this.renderInput(
                "major",
                "Major",
                <select
                  onChange={this.handleChange}
                  value={this.state.student.major || "Make Selection"}
                  name="major"
                  className="form-control"
                  id="major"
                >
                  {majorOptions}
                </select>
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-xs-12 col-md-4">
              {this.renderInput(
                "graduationYear",
                "Graduation Year",
                <select
                  onChange={this.handleChange}
                  value={this.state.student.graduationYear || "Make Selection"}
                  name="graduationYear"
                  className="form-control"
                  id="graduationYear"
                >
                  {gradYearOptions}
                </select>
              )}
            </Col>
            <Col className="form-group col-xs-12 col-md-5">
              {this.renderInput(
                "genderPronouns",
                "Gender Pronouns",
                <select
                  onChange={this.handleChange}
                  value={this.state.student.genderPronouns || "Make Selection"}
                  name="genderPronouns"
                  className="form-control"
                  id="genderPronouns"
                >
                  {genderPronounOptions}
                </select>
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="col-xs-4 col-md-2">
              <DeleteControl
                modalTitle="Delete Student"
                buttonTitle="Delete"
                buttonColor="danger"
                onClickAction={this.delete}
              />
            </Col>
            <Col className="col-xs-4 col-md-1">
              <Button color="secondary" onClick={this.cancel}>
                Cancel
              </Button>
            </Col>
            <Col className="col-xs-4 col-md-1">
              <Button color="primary" onClick={this.submit}>
                Save
              </Button>
            </Col>
          </Row>
        </Container>
      );
    } else if (this.state.error !== null) {
      return <ErrorView error={this.state.error} />;
    } else {
      return null;
    }
  }
}
