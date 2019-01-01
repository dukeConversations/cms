import React, { Component } from "react";
import API from "../api.js";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      completedDinners: [],
      claimedDinners: [],
      unclaimedDinners: []
    };
  }

  componentDidMount() {
    API.getDinnersForUserAndStatus(
      "ce92",
      2,
      dinners => {
        this.setState({ completedDinners: dinners });
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    return <div>Dash!</div>;
  }
}
