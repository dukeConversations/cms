import "./App.css";
import "./react-datetime.css";

import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import { Button, Nav, Navbar, NavItem } from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";

import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/dinners/checkin/CheckIn";

import Students from "./pages/students/Students";
import StudentDetail from "./pages/students/StudentDetail";
import StudentEdit from "./pages/students/StudentEdit";

import Professors from "./pages/professors/Professors";
import ProfessorDetail from "./pages/professors/ProfessorDetail";
import ProfessorEdit from "./pages/professors/ProfessorEdit";

import Dinners from "./pages/dinners/Dinners";
import DinnerDetail from "./pages/dinners/DinnerDetail";
import DinnerEdit from "./pages/dinners/DinnerEdit";
import DinnerSelection from "./pages/dinners/selection/DinnerSelection";

import Users from "./pages/users/Users";
import UserDetail from "./pages/users/UserDetail";
import UserEdit from "./pages/users/UserEdit";

import Login from "./pages/Login";

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
                <LinkContainer to="/dinners">
                  <Button color="link">Dinners</Button>
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
                <LinkContainer to="/users">
                  <Button color="link">Users</Button>
                </LinkContainer>
              </NavItem>
            </Nav>
          </Navbar>

          <div className="content">
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/students" component={Students} />
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

            <Route exact path="/dinners" component={Dinners} />
            <Route exact path="/dinners/v/:id" component={DinnerDetail} />
            <Route
              exact
              path="/dinners/e/:id"
              render={props => <DinnerEdit {...props} isCreating={false} />}
            />
            <Route
              exact
              path="/dinners/c"
              render={props => <DinnerEdit {...props} isCreating={true} />}
            />
            <Route
              exact
              path="/dinners/s/:id"
              render={props => <DinnerSelection {...props} />}
            />
            <Route
              exact
              path="/dinners/ch/:id"
              render={props => <CheckIn {...props} />}
            />

            <Route exact path="/professors" component={Professors} />
            <Route exact path="/professors/v/:id" component={ProfessorDetail} />
            <Route
              exact
              path="/professors/e/:id"
              render={props => <ProfessorEdit {...props} isCreating={false} />}
            />
            <Route
              exact
              path="/professors/c"
              render={props => <ProfessorEdit {...props} isCreating={true} />}
            />

            <Route exact path="/users" component={Users} />
            <Route exact path="/users/v/:id" component={UserDetail} />
            <Route
              exact
              path="/users/e/:id"
              render={props => <UserEdit {...props} isCreating={false} />}
            />
            <Route
              exact
              path="/users/c"
              render={props => <UserEdit {...props} isCreating={true} />}
            />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
