import React, { Component } from "react";
import { Button } from "reactstrap";
import Dicts from "../../../dictionaries";

export default class CheckInRow extends Component {
  changeStatus = status => {
    this.props.changeStatusHandler(this.props.application.id, status);
  };

  render() {
    let application = this.props.application;
    let gradYearString =
      "'" + application.student.graduationYear.toString().substring(2, 4);
    return (
      <tr>
        <td className="text-left align-middle">
          <div>{gradYearString}</div>
          <div>{Dicts.getMajor(application.student.major)}</div>
        </td>
        {application.status !== 0 && (
          <td className="text-right align-middle">
            <Button color="link" onClick={() => this.changeStatus(0)}>
              R
            </Button>
          </td>
        )}
        {application.status !== 1 && (
          <td className="text-right align-middle">
            <Button color="link" onClick={() => this.changeStatus(1)}>
              A
            </Button>
          </td>
        )}
        {application.status !== 3 && (
          <td className="text-right align-middle">
            <Button color="link" onClick={() => this.changeStatus(3)}>
              W
            </Button>
          </td>
        )}
        <td className="text-right align-middle">
          <Button
            color="link"
            onClick={() => this.props.openAppHandler(application.id)}
          >
            View
          </Button>
        </td>
      </tr>
    );
  }
}
