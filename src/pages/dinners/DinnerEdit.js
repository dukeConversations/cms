import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as API from "duke-convos-api";
import Validator from "../../validator";
import * as Rules from "../../rules";
import moment from "moment";
import DateTime from "react-datetime";
import DeleteControl from "../../DeleteModalControl";

export default class DinnerEdit extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      dinner: null,
      professors: [],
      users: [],
      showErrors: false,
      validationErrors: {}
    };
    this.handleChange = this.handleChange.bind(this);
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
        dinner: {
          catering: false,
          transportation: false,
          applications: []
        }
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

    API.getUsers(
      users => {
        console.log(users);
        this.setState({ users: users });
      },
      error => {
        console.error(error);
      }
    );
  }

  validateFields = () => {
    let dinnerObj = this.state.dinner;

    console.log(dinnerObj);

    let validator = new Validator(dinnerObj);

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

  internalHandleChange = (key, value) => {
    var dinnerObj = this.state.dinner;
    dinnerObj[key] = value;
    this.setState({ dinner: dinnerObj });
    if (this.state.showErrors) this.validateFields();
  };

  handleChange = evt => {
    this.internalHandleChange(evt.target.name, evt.target.value);
  };

  handleTimestampChange = date => {
    if (date instanceof moment) {
      this.internalHandleChange("timeStamp", date.unix());
    }
  };

  handleBooleanChange = evt => {
    this.internalHandleChange(evt.target.name, evt.target.checked);
  };

  submit = () => {
    console.log(this.state.dinner);
    this.setState({ showErrors: true });
    let valid = this.validateFields();
    if (valid || !valid) {
      // submit and go to last page
      if (this.props.isCreating) {
        API.createDinner(
          this.state.dinner,
          // the data is returned in dinners
          dinner => {
            console.log(dinner);
            this.props.history.goBack();
          },
          // an error is returned
          error => {
            console.error(error);
          }
        );
      } else {
        API.updateDinner(
          this.state.dinner.id,
          this.state.dinner,
          // the data is returned in dinner
          dinner => {
            console.log(dinner);
            this.props.history.goBack();
          },
          // an error is returned
          error => {
            console.error(error);
            //this.props.history.goBack();
          }
        );
      }
    }
  };

  delete = () => {
    API.deleteDinner(
      this.state.dinner.id,
      // the data is returned in dinner
      dinner => {
        console.log(dinner);
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
    let inputLabel =
      inputName.length !== 0 ? (
        <label htmlFor={inputId}>{inputName}</label>
      ) : null;
    return (
      <div>
        {inputLabel}
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

  renderDateInput(props, openCalendar, closeCalendar) {
    return (
      <div>
        <input className="form-control" {...props} readOnly />
      </div>
    );
  }

  displayProp = (obj, prop, def) => {
    return obj.hasOwnProperty(prop) ? obj[prop] : def;
  };

  render() {
    let dinner = this.state.dinner;

    if (dinner != null) {
      let date = moment.unix(dinner.timeStamp);

      let professors = this.state.professors;

      let key = 0;
      const professorOptions = professors.map(prof => {
        return (
          <option key={key++} value={prof.uniqueID}>
            {prof.firstName + " " + prof.lastName}
          </option>
        );
      });
      professorOptions.splice(
        0,
        0,
        <option key={key++} disabled>
          Make Selection
        </option>
      );

      let users = this.state.users;
      const userOptions = users.map(user => {
        return (
          <option key={key++} value={user.id}>
            {user.firstName + " " + user.lastName}
          </option>
        );
      });
      userOptions.splice(
        0,
        0,
        <option key={key++} value={-1}>
          Unclaimed
        </option>
      );

      return (
        <Container>
          <Row className="my-2">
            <Col className="form-group col-5">
              {this.renderInput(
                "topic",
                "Topic",
                <input
                  className="form-control"
                  type="text"
                  name="topic"
                  id="topic"
                  placeholder="The history of history"
                  value={this.displayProp(dinner, "topic", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
            <Col className="form-group col-5">
              {this.renderInput(
                "professorID",
                "professor",
                <select
                  className="form-control"
                  value={this.displayProp(
                    dinner,
                    "professorID",
                    "Make Selection"
                  )}
                  onChange={this.handleChange}
                  name="professorID"
                  id="professorID"
                >
                  {professorOptions}
                </select>
              )}
            </Col>
            {this.props.isCreating === false && (
              <Col className="form-group col-5">
                {this.renderInput(
                  "userID",
                  "User",
                  <select
                    className="form-control"
                    type="number"
                    value={this.displayProp(dinner, "userID", "Unclaimed")}
                    onChange={this.handleChange}
                    name="userID"
                    id="userID"
                  >
                    {userOptions}
                  </select>
                )}
              </Col>
            )}
          </Row>
          <Row>
            <Col className="form-group">
              {this.renderInput(
                "description",
                "Description",
                <textarea
                  className="form-control"
                  rows="3"
                  type="text"
                  name="description"
                  id="description"
                  placeholder="This conversation is about this and this and this, too. Oh! and even that."
                  value={this.displayProp(dinner, "description", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-5">
              {this.renderInput(
                "address",
                "Address",
                <textarea
                  className="form-control"
                  rows="3"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="1 Infinite Loop"
                  value={this.displayProp(dinner, "address", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
            <Col className="form-group col-4">
              {this.renderInput(
                "timeStamp",
                "Date & time",
                <DateTime
                  name="timeStamp"
                  id="timeStamp"
                  renderInput={this.renderDateInput}
                  timeConstraints={{ minutes: { step: 5 } }}
                  value={date.isValid() ? date : null}
                  onChange={this.handleTimestampChange}
                />
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-2">
              {this.renderInput(
                "studentLimit",
                "Student limit",
                <input
                  className="form-control"
                  type="number"
                  name="studentLimit"
                  id="studentLimit"
                  placeholder={12}
                  min={0}
                  value={this.displayProp(dinner, "studentLimit", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
            <Col className="form-group">
              {this.renderInput(
                "dietaryRestrictions",
                "Dietary Restrictions",
                <input
                  className="form-control"
                  rows="3"
                  type="text"
                  name="dietaryRestrictions"
                  id="dietaryRestrictions"
                  placeholder="Wheat, liquid, meat"
                  value={this.displayProp(dinner, "dietaryRestrictions", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-2">
              <label htmlFor="catering">Catering: </label>
              &ensp;
              <input
                type="checkbox"
                name="catering"
                id="catering"
                checked={this.displayProp(dinner, "catering", false)}
                onChange={this.handleBooleanChange}
              />
            </Col>
            <Col className="form-group col-2">
              <label htmlFor="transportation">Transportation: </label>
              &ensp;
              <input
                type="checkbox"
                name="transportation"
                id="transportation"
                checked={this.displayProp(dinner, "transportation", false)}
                onChange={this.handleBooleanChange}
              />
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="col-3">
              <DeleteControl
                modalTitle="Delete Dinner"
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
