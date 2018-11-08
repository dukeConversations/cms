import React, { Component } from "react";
import * as API from "duke-convos-api";
import Validator from "../../validator";
import * as Rules from "../../rules";

export default class UserEdit extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      user: null,
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
    var userObj = this.state.user;
    userObj[evt.target.name] = evt.target.value;
    this.setState({ user: userObj });
    if (this.state.showErrors) this.validateFields();
  }

  // When the component is added, fetch the student and update state
  componentDidMount() {
    if (!this.props.isCreating) {
      API.getProfessor(
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
    return <div>Edit User stuff</div>;
  }
}
