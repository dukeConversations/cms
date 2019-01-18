import React, { Component } from "react";
import * as API from "../api.js";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as Auth from "../auth";

export default class LoginPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange(evt) {
    let fieldName = evt.target.name;
    let fieldValue = evt.target.value;

    this.setState({ [fieldName]: fieldValue });
  }

  login = () => {

    // Ensure the user has entered content in to the username and password inputs
    if(this.state.username == "" && this.state.password == ""){
      this.setState({errorMessage: "Username and password fields cannot be left blank."})
      return;
    }
    else if(this.state.username == ""){
      this.setState({errorMessage: "Username field cannot be left blank."})
      return;
    }
    else if(this.state.password == ""){
      this.setState({errorMessage: "Password field cannot be left blank."})
      return;
    }

    API.login(
      this.state.username,
      this.state.password,
      response => {
        this.setState({ errorMessage: null });
        this.props.toggleHandler();
        this.props.loginHandler(response);
      },
      // an error is returned
      error => {
        this.setState({ errorMessage: error.message });
        console.error(error);
      }
    );
  };

  toggle = () => {
    this.props.toggleHandler();
  };

  render() {
    return (
      <Modal isOpen={true} toggle={this.toggle} backdrop={false}>
        <ModalHeader toggle={this.toggle}>Login</ModalHeader>
        <ModalBody>
          <label> Username </label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            placeholder="user"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br/>
          <label> Password </label>
          <input
            className="form-control"
            type="text"
            name="password"
            id="password"
            placeholder="pass"
            value={this.state.password}
            onChange={this.handleChange}
          />
          {this.state.errorMessage !== null && (
            <label style={{ textColor: "#FF0000" }}>
              {this.state.errorMessage}
            </label>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.login}>
            Login
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
