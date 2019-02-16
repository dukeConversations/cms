import React, { Component } from "react";
import DinnersTable from "./DinnersTable";
import * as API from "duke-convos-api";
import { Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import ErrorView from "../../ErrorView";
import { Table, Button, Row, Col, Container } from "reactstrap";

export default class Dinners extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      dinners: [],
      error: null
    };
  }

  // When the component is added, fetch the dinners and update state
  componentDidMount() {
    API.getDinners(
      // the data is returned in dinners
      dinners => {
        this.setState({ error: null });
        this.setState({ dinners: dinners });
      },
      // an error is returned
      error => {
        this.setState({ error: error });
      }
    );
  }

  refreshPage = () => {
    this.componentDidMount();
  };

  render() {
    let error = this.state.error;
    if (error !== null) {
      return <ErrorView error={error} />;
    }

    // Render the JSX
    return (

      <Container>
        <h1>Dinners</h1>
        <NavLink to={"/dinners/c"}>Create</NavLink>
        <DinnersTable
          dinners={this.state.dinners}
          forceRender={this.refreshPage}
        />
      </Container>
    );
  }
}
