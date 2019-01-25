import React, { Component } from "react";
import * as API from "duke-convos-api";
import { Container, Row, Col, Button } from "reactstrap";
import Validator from "../../validator";
import DeleteControl from "../../DeleteModalControl";
import * as Rules from "../../rules";
import Dicts from "../../dictionaries";
import ErrorView from "../../ErrorView";

export default class UserEdit extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      user: null,
      showErrors: false,
      validationErrors: {},
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validateFields = () => {
    let userObj = this.state.user;

    let validator = new Validator(userObj);

    /*
    "username": String
    "password": String
    "email": String
    "role": int
    "netID": String
    "uniqueID": String
    "phone": String
    "firstName": String
    "lastName": String
    "emailText": String
    */
    validator.validate("username", true);
    validator.validate("password", true);
    validator.validate("email", true, [Rules.isEmail]);
    validator.validate("role", true);
    validator.validate("major", true);
    validator.validate("netID", true);
    validator.validate("uniqueID", true);
    validator.validate("phone", true, [Rules.isPhoneNumber]);
    validator.validate("firstName", true);
    validator.validate("lastName", true);
    validator.validate("emailText", true);

    let errorsDict = validator.errorsDict;
    console.log(errorsDict);
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

  componentDidMount() {
    if (!this.props.isCreating) {
      API.getUser(
        this.props.match.params.id,
        user => {
          this.setState({ error: null });
          this.setState({ user: user });
          console.log(user);
        },
        // an error is returned
        error => {
          this.setState({ error: error });
        }
      );
    } else {
      this.setState({
        user: {}
      });
    }
  }

  submit = () => {
    this.setState({ showErrors: true });
    let valid = this.validateFields();
    if (valid) {
      console.log("hey");
      if (this.props.isCreating) {
        console.log(this.state.user);
        API.createUser(
          this.state.user,
          user => {
            this.setState({ error: null });
            this.props.history.goBack();
          },
          // an error is returned
          error => {
            this.setState({ error: error });
            console.log(error);
          }
        );
      } else {
        API.updateUser(
          this.state.user.uniqueID,
          this.state.user,
          user => {
            this.setState({ error: null });
            this.props.history.goBack();
          },
          // an error is returned
          error => {
            this.setState({ error: error });
            console.log(error);
            //this.props.history.goBack();
          }
        );
      }
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

  displayProp = (obj, prop, def) => {
    return obj.hasOwnProperty(prop) ? obj[prop] : def;
  };

  render() {
    /*
    "username": String /
    "password": String /
    "email": String /
    "role": int
    "netID": String /
    "uniqueID": String /
    "phone": String /
    "firstName": String /
    "lastName": String /
    "emailText": String /
    */
    var user = this.state.user;

    if (user != null) {
      let majors = Dicts.majorsDict();

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
                  value={this.displayProp(user, "firstName", "")}
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
                  value={this.displayProp(user, "lastName", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
            <Col className="form-group col-xs-12 col-md-4">
              {this.renderInput(
                "role",
                "Role",
                <input
                  className="form-control"
                  type="text"
                  name="role"
                  id="role"
                  placeholder="0"
                  value={this.displayProp(user, "role", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-xs-12 col-md-4">
              {this.renderInput(
                "username",
                "Username",
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="jappleseed"
                  value={this.displayProp(user, "username", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
            <Col className="form-group col-xs-12 col-md-4">
              {this.renderInput(
                "email",
                "Email",
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="jappleseed@duke.edu"
                  value={this.displayProp(user, "email", "")}
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
                  value={this.state.user.major || "Make Selection"}
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
            <Col className="form-group col-xs-12 col-md-3">
              {this.renderInput(
                "password",
                "Password",
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  id="password"
                  placeholder="passworddd"
                  value={this.displayProp(user, "password", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
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
                  value={this.displayProp(user, "netID", "")}
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
                  value={this.displayProp(user, "uniqueID", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col-xs-12 col-md-6">
              {this.renderInput(
                "phone",
                "Phone",
                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="(123) 456-789"
                  value={this.displayProp(user, "phone", "")}
                  onChange={this.handleChange}
                />
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col className="form-group col">
              {this.renderInput(
                "emailText",
                "Email Text",
                <textarea
                  className="form-control"
                  rows="4"
                  type="text"
                  name="emailText"
                  id="emailText"
                  placeholder="1 Infinite Loop"
                  value={this.displayProp(user, "emailText", "")}
                  onChange={this.handleChange}
                />
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
