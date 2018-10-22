import "./App.css";
import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import { Button, Nav, Navbar, NavItem } from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/students/Students";
import StudentDetail from "./pages/students/StudentDetail";
import StudentEdit from "./pages/students/StudentEdit";
import Professors from "./pages/professors/Professors";
import ProfessorDetail from "./pages/professors/ProfessorDetail";
import Dinners from "./pages/dinners/Dinners";
import DinnerDetail from "./pages/dinners/DinnerDetail";
import Selection from "./pages/Selection";
import Users from "./pages/users/Users";
import UserDetail from "./pages/users/UserDetail";
import CheckIn from "./pages/CheckIn";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Navbar color="dark" expand="md">
            <Nav>
              <NavItem>
                <LinkContainer to="/">
                  <Button color="link">Dashboard</Button>
                </LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to="/students">
                  <Button color="link">Students</Button>
                </LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to="/professors">
                  <Button color="link">Professors</Button>
                </LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to="/dinners">
                  <Button color="link">Dinners</Button>
                </LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to="/selection">
                  <Button color="link">Selection</Button>
                </LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to="/users">
                  <Button color="link">Users</Button>
                </LinkContainer>
              </NavItem>
              <NavItem>
                <LinkContainer to="/checkIn">
                  <Button color="link">Check In</Button>
                </LinkContainer>
              </NavItem>
            </Nav>
          </Navbar>
          {/* <Navbar>
            <li className="nav-item active">
          <LinkContainer to="/">
            <Button color="link">Dashboard</Button>
          </LinkContainer>
            </li>
            <li className="nav-item">
          <LinkContainer to="/students">
            <Button>Students</Button>
          </LinkContainer>
            </li>
            <li className="nav-item">
          <LinkContainer to="/professors">
            <Button>Professors</Button>
          </LinkContainer>
            </li>
            <li className="nav-item">
          <LinkContainer to="/dinners">
            <Button>Dinners</Button>
          </LinkContainer>
            </li>
            <li className="nav-item">
          <LinkContainer to="/selection">
            <Button>Selection</Button>
          </LinkContainer>
            </li>
            <li className="nav-item">
          <LinkContainer to="/users">
            <Button>Users</Button>
          </LinkContainer>
            </li>
            <li className="nav-item">
          <LinkContainer to="/checkIn">
            <Button>Check In</Button>
          </LinkContainer>
            </li>
        </Navbar> */}

          <div className="content">
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/professors" component={Professors} />
            <Route exact path="/dinners" component={Dinners} />
            <Route exact path="/selection" component={Selection} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/checkIn" component={CheckIn} />
            <Route exact path="/users/:id" component={UserDetail} />
            <Route exact path="/professors/:id" component={ProfessorDetail} />
            <Route exact path="/dinners/:id" component={DinnerDetail} />

            <Route exact path="/students/v/:netID" component={StudentDetail} />
            <Route
              exact
              path="/students/e/:netID"
              render={props => <StudentEdit {...props} isCreating={false} />}
            />
            <Route
              exact
              path="/students/c"
              render={props => <StudentEdit {...props} isCreating={true} />}
            />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
