import React, { Component } from "react";
import * as API from "duke-convos-api";

export default class DinnerSelection extends Component {
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

    // +  "id": 1,
    // +  "timeStamp": "20NOV1652",
    // +  "topic": "The Spanish Inquisitino",
    // +  "description": "You'll never expect it",
    // +  "studentLimit": 1330,
    // +  "address": "200 Carr",
    // +  "dietaryRestrictions": "No Heretics",
    // -  "invitationSentTimeStamp": "12341",
    // +  "catering": false,
    // +  "transportation": true,
    // +  "professorID": "111",
    // -  "applications": []

    if (dinner != null) {
      return <div>{dinner.topic}</div>;
    } else {
      return null;
    }
  }
}
