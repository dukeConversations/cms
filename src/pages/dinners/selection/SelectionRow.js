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
        <div className="card">
          <div className="card-header">
            {gradYearString} {Dicts.getMajor(application.student.major)}
          </div>
          <div class="btn-group" role="group" >
            {application.status !== 0 && application.status !== 2 && (
                <Button type="button" className="btn btn-danger" onClick={() => this.changeStatus(0)}>
                  Reject
                </Button>
            )}

            {application.status !== 0 && application.status !== 2 && (<Button
              type="button" className="btn btn-secondary"
              onClick={() => this.props.openAppHandler(application.id)}>
              View
            </Button>)}

            { application.status !== 1 && (
                <Button type="button" className="btn btn-success" onClick={() => this.changeStatus(1)}>
                  Accept
                </Button>
            )}

            {application.status !== 1 && application.status !== 3 && (<Button
              type="button" className="btn btn-secondary"
              onClick={() => this.props.openAppHandler(application.id)}>
              View
            </Button>)}


            {application.status !== 3 && (
              <Button  type="button" className="btn btn-warning" onClick={() => this.changeStatus(3)}>
                Wait
              </Button>
            )}

          </div>
        </div>

        <br />

      </tr>

    );
  }
}
