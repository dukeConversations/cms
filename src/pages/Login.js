import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as API from "../api.js";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    let fieldName = evt.target.name;
    let fieldValue = evt.target.value;

    this.setState({ [fieldName]: fieldValue });
  }

  login = () => {
    API.getUserInfo(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );

    API.login(
      this.state.username,
      this.state.password,

      response => {
        console.log(response);

        API.getUserInfo(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  };

  render() {
    return (
      <div>
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

        <Button color="primary" onClick={this.login}>
          Login
        </Button>
      </div>
    );
  }
}
