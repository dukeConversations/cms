import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import DeleteControl from "../../DeleteModalControl";
import API from "duke-convos-api";
import Dicts from "../../dictionaries";

export default class ProfessorRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  delete = () => {
    API.deleteProfessor(
      this.props.professor.uniqueID,
      professor => {},
      // an error is returned
      error => {
        console.error(error);
      }
    );
  };

  render() {
    var professor = this.props.professor;
    return (
      <tr>
        <td className="text-left">{professor.firstName}</td>
        <td className="text-left">{professor.lastName}</td>
        <td className="text-left">
          {Dicts.getDepartment(professor.department)}
        </td>
        <td className="text-left">{professor.dinnerCount}</td>
        <td className="text-center">
          <div className="d-inline-flex">
            <span className="align-middle">
              <NavLink to={"professors/v/" + professor.uniqueID}>
                <Button color="link">V</Button>
              </NavLink>{" "}
              |{" "}
            </span>
            <span className="align-middle">
              <NavLink to={"/professors/e/" + professor.uniqueID}>
                <Button color="link">E</Button>
              </NavLink>
              |{" "}
            </span>
            <DeleteControl
              modalTitle="Delete Professor"
              buttonTitle="D"
              buttonColor="link"
              onClickAction={this.delete}
            />
          </div>
        </td>
      </tr>
    );
  }
}
