import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import * as API from "duke-convos-api";

export default class DinnerSelection extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      applicationStatuses: {}
    };
  }

  componentDidMount() {
    API.getDinner(
      this.props.match.params.id,
      // the data is returned in dinner
      dinner => {
        console.log(dinner);
        let applicationStatuses = {};
        for (var i = 0; i < dinner.applications.length; i++) {
          let application = dinner.applications[i];
          applicationStatuses[application.id] = application.status;
        }

        this.setState({ applicationStatuses: applicationStatuses });
      },
      // an error is returned
      error => {
        console.error(error);
      }
    );
  }

  render() {
    let { applicationStatuses } = this.state;
    let handler = this.updateStatusesDict;

    var waitlistedRows = [];
    var acceptedRows = [];
    var unsortedRows = [];

    for (var appID in applicationStatuses) {
      let applicationStatus = applicationStatuses[appID];
    }

    return (
      <Container>
        <Row className="my-2">
          <Col className="col-4 mx-2">
            <Table bordered responsive>
              <tbody>{unsortedRows}</tbody>
            </Table>
          </Col>
          <Col className="col-4 mx-2">
            <Table bordered responsive>
              <tbody>{acceptedRows}</tbody>
            </Table>
          </Col>
          <Col className="col-4 mx-2">
            <Table bordered responsive>
              <tbody>{waitlistedRows}</tbody>
            </Table>
          </Col>
        </Row>
        <Row className="my-2">
          <Button onClick={this.saveChanges}>Save</Button>
        </Row>
      </Container>
    );
  }
}
