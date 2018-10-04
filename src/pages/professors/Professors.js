import React, { Component } from "react";
import ProfessorItem from "./ProfessorItem";
import * as API from "../../api";

export default class Professors extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      professors: []
    };
  }

  // When the component is added, fetch the professors and update state
  componentDidMount() {
    API.getProfessors(
      professors => {
        this.setState({ professors: professors });
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    // Generate a list of ProfessorItems from the array in state.professors
    const professorListItems = this.state.professors.map(professor => {
      return <ProfessorItem professor={professor} key={professor.url} />;
    });

    // Return the JSX to render
    return <ul>{professorListItems}</ul>;
  }
}
