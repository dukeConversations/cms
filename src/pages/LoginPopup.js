import React, { Component } from "react";
import * as API from "../api.js";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class LoginPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: "",
      password: ""
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
    API.login(
      this.state.username,
      this.state.password,

      response => {
        console.log(response);
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  actionAndToggle = () => {
    this.props.onClickAction();
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button color={"primary"} onClick={this.toggle}>
          Open Login
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={false}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              placeholder="user"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              className="form-control"
              type="text"
              name="password"
              id="password"
              placeholder="pass"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.login}>
              Login
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
