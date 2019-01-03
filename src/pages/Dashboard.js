import React, { Component } from "react";
import DinnersTable from "./dinners/DinnersTable";
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
    let myUserId = "ce92";

    API.getDinners(
      dinners => {
        console.log(dinners);

        let completedDinners = [];
        let claimedDinners = [];
        let unclaimedDinners = [];

        for (var i = 0; i < dinners.length; i++) {
          let dinner = dinners[i];

          if (dinner.status === 2 && dinner.userID === myUserId) {
            completedDinners.push(dinner);
          } else if (dinner.status === 1 && dinner.userID === myUserId) {
            claimedDinners.push(dinner);
          } else if (dinner.userID === null) {
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

    // API.getDinnersForUserAndStatus(
    //   "ce92",
    //   2,
    //   dinners => {
    //     this.setState({ completedDinners: dinners });
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    //
    // API.getDinnersForUserAndStatus(
    //   "ce92",
    //   1,
    //   dinners => {
    //     this.setState({ claimedDinners: dinners });
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
    //
    // API.getDinnersWithStatus(
    //   0,
    //   dinners => {
    //     this.setState({ unclaimedDinners: dinners });
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
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
