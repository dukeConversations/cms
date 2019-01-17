import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as API from "duke-convos-api";
import Validator from "../../validator";
import * as Rules from "../../rules";
import DeleteControl from "../../DeleteModalControl";
import Dicts from "../../dictionaries";
import ErrorView from "../../ErrorView";

export default class ProfessorEdit extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      professor: null,
      showErrors: false,
      validationErrors: {},
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // When the component is added, fetch the professor and update state
  componentDidMount() {
    if (!this.props.isCreating) {
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
    } else {
      this.setState({
        professor: {}
      });
    }
  }

  validateFields = () => {
    let professorObj = this.state.professor;

    let validator = new Validator(professorObj);

    validator.validate("uniqueID", true);
    validator.validate("firstName", true);
    validator.validate("lastName", true);
    validator.validate("email", true, [Rules.isEmail]);
    validator.validate("genderPronouns", true, [Rules.isNumber]);
    validator.validate("department", true, [Rules.isNumber]);
    validator.validate("title", true);
    validator.validate("school", true, [Rules.isNumber]);

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
    var professorObj = this.state.professor;
    professorObj[evt.target.name] = evt.target.value;
    this.setState({ professor: professorObj });
    if (this.state.showErrors) this.validateFields();
  }

  submit = () => {
    console.log(this.state.professor);
    this.setState({ showErrors: true });
    let valid = this.validateFields();
    if (valid) {
      if (this.props.isCreating) {
        API.createProfessor(
          this.state.professor,
          // the data is returned in professor
          professor => {
            this.props.history.goBack();
          },
          // an error is returned
          error => {
            console.log(error);
          }
        );
      } else {
        API.updateProfessor(
          this.state.professor.uniqueID,
          this.state.professor,
          // the data is returned in professor
          professor => {
            this.props.history.goBack();
          },
          // an error is returned
          error => {
            console.log(error);
            //this.props.history.goBack();
          }
        );
      }
    }
  };

  delete = () => {
    API.deleteProfessor(
      this.state.professor.uniqueID,
      // the data is returned in professor
      professor => {
        console.log(professor);
        this.props.history.goBack();
      },
      // an error is returned
      error => {
        console.error(error);
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

  displayProp = (obj, prop, def) => {
    return obj.hasOwnProperty(prop) ? obj[prop] : def;
  };

  render() {
    var professor = this.state.professor;

    let departments = Dicts.departments();

    let schools = Dicts.schools();

    let genderPronouns = Dicts.genderPronouns();

    if (professor != null) {
      const departmentOptions = Object.keys(departments).map(key => {
        return (
          <option key={key} value={key}>
            {departments[key]}
          </option>
        );
      });
      departmentOptions.splice(
        0,
        0,
        <option key={Object.keys(departments).length} disabled>
          Make Selection
        </option>
      );

      const schoolOptions = Object.keys(schools).map(key => {
        return (
          <option key={key} value={key}>
            {schools[key]}
          </option>
        );
      });
      schoolOptions.splice(
        0,
        0,
        <option
          key={Object.keys(schools).length}
          value="Make Selection"
          disabled
        >
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
        <option
          key={Object.keys(genderPronouns).length}
          value="Make Selection"
          disabled
        >
          Make Selection
        </option>
      );

      return (
        <Container>
          {this.state.error !== null && <ErrorView error={this.state.error} />}
          <Row className="my-2">
            <Col className="form-group col-3">
              {this.renderInput(
                "firstName",
                "First Name",
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Johnny"
                  value={this.displayProp(professor, "firstName", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
            <Col className="form-group col-3">
              {this.renderInput(
                "lastName",
                "Last Name",
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Appleseed"
                  value={this.displayProp(professor, "lastName", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
            <Col className="form-group col-3">
              {this.renderInput(
                "uniqueID",
                "Unique ID",
                <input
                  className="form-control"
                  type="text"
                  name="uniqueID"
                  id="uniqueID"
                  placeholder="12345"
                  disabled={!this.props.isCreating}
                  value={this.displayProp(professor, "uniqueID", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-3">
              {this.renderInput(
                "genderPronouns",
                "Gender Pronouns",
                <select
                  className="form-control"
                  id="genderPronouns"
                  name="genderPronouns"
                  value={this.displayProp(
                    professor,
                    "genderPronouns",
                    "Make Selection"
                  )}
                  onChange={this.handleChange}
                >
                  {genderPronounOptions}
                </select>
              )}
            </Col>
            <Col className="form-group col-4">
              {this.renderInput(
                "email",
                "Email",
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="cbray@duke.edu"
                  value={this.displayProp(professor, "email", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group">
              {this.renderInput(
                "title",
                "Title",
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Supreme dictator of maths"
                  value={this.displayProp(professor, "title", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-6">
              {this.renderInput(
                "department",
                "Department",
                <select
                  className="form-control"
                  id="department"
                  name="department"
                  value={this.displayProp(
                    professor,
                    "department",
                    "Make Selection"
                  )}
                  onChange={this.handleChange}
                >
                  {departmentOptions}
                </select>
              )}
            </Col>
            <Col className="form-group col-3">
              {this.renderInput(
                "school",
                "School",
                <select
                  className="form-control"
                  id="school"
                  name="school"
                  value={this.displayProp(
                    professor,
                    "school",
                    "Make Selection"
                  )}
                  onChange={this.handleChange}
                >
                  {schoolOptions}
                </select>
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="col-3">
              <DeleteControl
                modalTitle="Delete Professor"
                buttonTitle="Delete"
                buttonColor="danger"
                onClickAction={this.delete}
              />
            </Col>
            <Col className="col-1">
              <Button color="secondary" onClick={this.cancel}>
                Cancel
              </Button>
            </Col>
            <Col className="col-1">
              <Button color="primary" onClick={this.submit}>
                Save
              </Button>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return null;
    }
  }
}
