import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
import * as API from "duke-convos-api";

export default class DinnerDetail extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      dinner: null
    };
  }

  // When the component is added, fetch the dinner and update state
  componentDidMount() {
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
  }

  render() {
    var dinner = this.state.dinner;

    if (dinner != null) {
      // Render the JSX
      return (
        <Container>
          <Row>Dinner stuff</Row>
        </Container>
      );
    } else {
      return null;
    }
  }
}
