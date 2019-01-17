import React, { Component } from "react";
import DinnersTable from "./dinners/DinnersTable";
import Auth from "../auth";
import API from "duke-convos-api";
import ErrorView from "../ErrorView";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      completedDinners: [],
      claimedDinners: [],
      unclaimedDinners: [],
      error: null
    };
  }

  refreshPage = () => {
    this.componentDidMount();
  };

  componentDidMount() {
    if (Auth.isLoggedIn()) {
      let currentUser = Auth.loggedInUser();
      console.log(currentUser);
      let myUserId = currentUser.id;

      API.getDinners(
        dinners => {
          this.setState({ error: null });
          let completedDinners = [];
          let claimedDinners = [];
          let unclaimedDinners = [];

          for (var i = 0; i < dinners.length; i++) {
            let dinner = dinners[i];

            if (dinner.userID === myUserId) {
              if (dinner.status === 2) {
                completedDinners.push(dinner);
              } else {
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
          this.setState({ error: error });
        }
      );
    }
  }

  render() {
    let error = this.state.error;
    if (error !== null) {
      return <ErrorView error={error} />;
    }

    return (
      <div>
        <h3>Completed Dinners</h3>
        <DinnersTable
          dinners={this.state.completedDinners}
          rowType={2}
          forceRender={this.refreshPage}
        />
        <br />
        <h3>Claimed Dinners</h3>
        <DinnersTable
          dinners={this.state.claimedDinners}
          rowType={1}
          forceRender={this.refreshPage}
        />
        <br />
        <h3>Unclaimed Dinners</h3>
        <DinnersTable
          dinners={this.state.unclaimedDinners}
          rowType={0}
          forceRender={this.refreshPage}
        />
      </div>
    );
  }
}
