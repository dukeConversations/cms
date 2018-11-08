import React, { Component } from "react";
import * as API from "duke-convos-api";
import Validator from "../../validator";
import * as Rules from "../../rules";

export default class DinnerEdit extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      dinner: null,
      professors: [],
      showErrors: false,
      validationErrors: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validateFields = () => {
    let dinnerObj = this.state.dinner;

    let validator = new Validator(dinnerObj);

    /*
    {
    "id": 1,
    "timeStamp": "20NOV1652",
    "topic": "The Spanish Inquisitino",
    "description": "You'll never expect it",
    "studentLimit": 1330,
    "address": "200 Carr",
    "dietaryRestrictions": "No Heretics",
    "invitationSentTimeStamp": "12341",
    "catering": false,
    "transportation": true,
    "professorID": "111",
    "applications": []
    }
    */

    validator.validate("id", true);
    validator.validate("timeStamp", true);
    validator.validate("topic", true);
    validator.validate("description", true);
    validator.validate("studentLimit", true, [Rules.isNumber]);
    validator.validate("address", true);
    validator.validate("dietaryRestrictions", true);
    validator.validate("invitationSentTimeStamp", true);
    validator.validate("catering", true);
    validator.validate("transportation", true);
    validator.validate("professorID", true);
    validator.validate("applications", true);

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
    var dinnerObj = this.state.dinner;
    dinnerObj[evt.target.name] = evt.target.value;
    this.setState({ dinner: dinnerObj });
    if (this.state.showErrors) this.validateFields();
  }

  // When the component is added, fetch the student and update state
  componentDidMount() {
    if (!this.props.isCreating) {
      API.getDinner(
        this.props.match.params.id,
        // the data is returned in dinner
        dinner => {
          this.setState({ dinner: dinner });
        },
        // an error is returned
        error => {
          console.error(error);
        }
      );
    } else {
      this.setState({
        dinner: {}
      });
    }

    API.getProfessors(
      professors => {
        this.setState({ professors: professors });
      },
      error => {
        console.error(error);
      }
    );
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
    return <div>Edit dinner stuff</div>;
  }
}
