import React, { Component } from "react";
import DinnersTable from "./dinners/DinnersTable";
import Auth from "../auth";
import API from "duke-convos-api";

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
    if (Auth.isLoggedIn()) {
      let currentUser = Auth.loggedInUser();
      console.log(currentUser);
      let myUserId = currentUser.id;

      API.getDinners(
        dinners => {
          let completedDinners = [];
          let claimedDinners = [];
          let unclaimedDinners = [];

          for (var i = 0; i < dinners.length; i++) {
            let dinner = dinners[i];

            if (dinner.userID === myUserId) {
              if (dinner.status === 2) {
                completedDinners.push(dinner);
              } else if (dinner.status === 1) {
                claimedDinners.push(dinner);
              }
            } else if (dinner.userID === -1) {
              unclaimedDinners.push(dinner);
            }
          }

          this.setState({
            completedDinners: completedDinners,
            claimedDinners: claimedDinners,
            unclaimedDinners: unclaimedDinners
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  render() {
    return (
      <div>
        <h3>Completed Dinners</h3>
        <DinnersTable dinners={this.state.completedDinners} rowType={2} />
        <br />
        <h3>Claimed Dinners</h3>
        <DinnersTable dinners={this.state.claimedDinners} rowType={1} />
        <br />
        <h3>Unclaimed Dinners</h3>
        <DinnersTable dinners={this.state.unclaimedDinners} rowType={0} />
      </div>
    );
  }
}
