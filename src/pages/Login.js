import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as API from "../api.js";
import LoginPopup from "./LoginPopup";

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

  render() {
    return <LoginPopup />;
  }
}
