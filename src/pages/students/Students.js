import React, { Component } from "react";
import StudentRow from "./StudentRow";
import * as API from "duke-convos-api";
import { Table, Button, Row, Col, Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import ErrorView from "../../ErrorView";
import ReactTable from "react-table";
import Dicts from "../../dictionaries";

export default class Students extends Component {
  // Instantiate state when the component is constructed
  constructor() {
    super();
    this.state = {
      students: [],
      error: null,
      selectedStudent: null
    };
  }

  // When the component is added, fetch the students and update state
  componentDidMount() {
    API.getStudents(
      // the data is returned in students
      students => {
        this.setState({ error: null });
        this.setState({ students: students });
        console.log("HERE DUMBASS");
        console.log(students);
      },
      // an error is returned
      error => {
        this.setState({ error: error });
      }
    );
  }

  // onRowClick(e, t, rowInfo) {
  //   this.setState((oldState) => {
  //       let data = oldState.data.slice();
  //       let copy = Object.assign({},  data[rowInfo.index]);
  //
  //       copy.selected = true;
  //       copy.FirstName = "selected";
  //       data[rowInfo.index] = copy;
  //
  //       return {
  //           data: data
  //       }
  // });

  innerRenderLabel = (id, labelName, labelValue) => {
    return (
      <div>
        <label htmlFor={id}>
          <strong>{labelName}</strong>
        </label>
        <br />
        <label className="property-label" id={id}>
          {labelValue}
        </label>
      </div>
    );
  };

  renderLabel = (id, labelName) => {
    return this.innerRenderLabel(id, labelName, this.state.student[id]);
  };

  render() {
    // // Generate a list of StudentRows from the array in state.students
    // const studentRows = this.state.students.map(student => {
    //   return <StudentRow key={student.netID} student={student} />;
    // });

    const moreData = this.state.students;

    const columns = [
      {
        Header: "First Name",
        accessor: "firstName", // String-based value accessors!
        maxWidth: 100,
        Cell: props => <span>{props.value}</span> // Custom cell components!
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        maxWidth: 100,
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: "NetID",
        accessor: "netID",
        maxWidth: 100,
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: "Class",
        accessor: "graduationYear",
        maxWidth: 100,
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: "Selections",
        accessor: "numberSelections",
        maxWidth: 100,
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: "Sem. Selections",
        accessor: "numberSelectionsSemester",
        maxWidth: 400,
        minWidth: 150,
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      }
    ];

    // Render the JSX
    return (
      <Container>
        {this.state.error !== null && <ErrorView error={this.state.error} />}
        <Row>
          <Col>
            <h1>Students</h1>
          </Col>

          <Col> </Col>

          <Col style={{ textAlign: "right" }}>
            <NavLink to={"/students/c"}>
              {" "}
              <Button style={{ backgroundColor: "#343A40" }}>
                {" "}
                Create New Student{" "}
              </Button>{" "}
            </NavLink>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col>
            <ReactTable
              getTrProps={(state, rowInfo) => {
                if (rowInfo && rowInfo.row) {
                  return {
                    onClick: e => {
                      this.setState({
                        selected: rowInfo.index
                      });
                      console.log(this.state.students);
                      console.log(rowInfo.index);
                      console.log(rowInfo.netID);

                      this.setState({
                        selectedStudent: rowInfo.index
                      });
                    },
                    style: {
                      background:
                        rowInfo.index === this.state.selected
                          ? "#00afec"
                          : "white",
                      color:
                        rowInfo.index === this.state.selected
                          ? "white"
                          : "black"
                    }
                  };
                } else {
                  return {};
                }
              }}
              data={moreData}
              columns={columns}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </Col>

          {this.state.selectedStudent !== null && (
            <Col style={{ paddingLeft: 100 }}>
              {/* <h3> <strong>{  this.state.students[this.state.selectedStudent].firstName} {this.state.students[this.state.selectedStudent].lastName }</strong> </h3> */}
              <Row>
                <Col>
                  {" "}
                  <Row>
                    <strong> First Name: </strong>{" "}
                  </Row>{" "}
                  <Row>
                    {this.state.students[this.state.selectedStudent].firstName}{" "}
                  </Row>{" "}
                </Col>
                <Col>
                  {" "}
                  <Row>
                    <strong> Last Name: </strong>{" "}
                  </Row>{" "}
                  <Row>
                    {this.state.students[this.state.selectedStudent].lastName}{" "}
                  </Row>{" "}
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  {" "}
                  <Row>
                    <strong> netID: </strong>{" "}
                  </Row>{" "}
                  <Row>
                    {this.state.students[this.state.selectedStudent].netID}{" "}
                  </Row>{" "}
                </Col>
                <Col>
                  {" "}
                  <Row>
                    <strong> uniqueID: </strong>{" "}
                  </Row>{" "}
                  <Row>
                    {this.state.students[this.state.selectedStudent].uniqueID}{" "}
                  </Row>{" "}
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  {" "}
                  <Row>
                    <strong> Phone: </strong>{" "}
                  </Row>{" "}
                  <Row>
                    {
                      this.state.students[this.state.selectedStudent]
                        .phoneNumber
                    }{" "}
                  </Row>{" "}
                </Col>
                <Col>
                  {" "}
                  <Row>
                    <strong> Major: </strong>{" "}
                  </Row>{" "}
                  <Row>
                    {Dicts.getMajor(
                      this.state.students[this.state.selectedStudent].major
                    )}{" "}
                  </Row>{" "}
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  {" "}
                  <Row>
                    <strong> Class: </strong>{" "}
                  </Row>{" "}
                  <Row>
                    {
                      this.state.students[this.state.selectedStudent]
                        .graduationYear
                    }{" "}
                  </Row>{" "}
                </Col>
                <Col>
                  {" "}
                  <Row>
                    <strong> Pronouns: </strong>{" "}
                  </Row>{" "}
                  <Row>
                    {Dicts.getGenderPronouns(
                      this.state.students[this.state.selectedStudent]
                        .genderPronouns
                    )}{" "}
                  </Row>{" "}
                </Col>
              </Row>

              <Row style={{ paddingTop: 100 }}>
                <NavLink
                  to={
                    "/students/e/" +
                    this.state.students[this.state.selectedStudent].netID
                  }
                >
                  <Button>EDIT</Button>
                </NavLink>
              </Row>
            </Col>
          )}

          {this.state.selectedStudent === null && (
            <Col>
              <h3> Select a row to learn more! </h3>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}
