import React, { Component } from "react";

export default class ProfessorItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    this.setState({ isChecked: props.selected });
  }

  render() {
    return (
      <tr>
        <td>
          <input type="checkbox" />
        </td>
        <td className="text-left">{this.props.professor.uniqueID}</td>
        <td className="text-left">{this.props.professor.firstName}</td>
        <td className="text-left">{this.props.professor.lastName}</td>
        <td className="text-left">{this.props.professor.genderPronouns}</td>
        <td className="text-left">{this.props.professor.department}</td>
        <td className="text-left">{this.props.professor.title}</td>
        <td className="text-left">{this.props.professor.dinnerCount}</td>
        <td className="text-left">{this.props.professor.school}</td>
      </tr>
    );
  }
}
