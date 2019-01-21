import "./App.css";
import "./react-datetime.css";

import React, { Component } from "react";
import { Redirect } from "react-router";
import { Route, HashRouter } from "react-router-dom";
import {
  Button,
  Nav,
  Navbar,
  NavItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { LinkContainer, NavLink } from "react-router-bootstrap";

import * as Auth from "./auth";

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

import LoginPopup from "./pages/LoginPopup";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: false,
      loggedIn: Auth.isLoggedIn(),
      loggedInUser: Auth.loggedInUser()
    };
  }

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  handleLogin = loginResponse => {
    Auth.setLogin(loginResponse);
    this.setState({
      loggedIn: Auth.isLoggedIn(),
      loggedInUser: Auth.loggedInUser()
    });
  };

  handleLogout = () => {
    Auth.logout();
    this.setState({
      loggedIn: false,
      loggedInUser: null
    });
  };

  render() {
    let toggleHandler = this.toggleLogin;
    let loginHandler = this.handleLogin;

    return (
      <HashRouter>
        <div>
          <Navbar color="dark" expand="md">
            <Nav className="mr-auto" navbar>
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
            <Nav className="ml-auto" navbar>
              <NavItem>
                {!Auth.isLoggedIn() && (
                  <Button color="primary" onClick={this.toggleLogin}>
                    Login
                  </Button>
                )}
                {Auth.isLoggedIn() && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {Auth.loggedInUser().firstName +
                        " " +
                        Auth.loggedInUser().lastName}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <LinkContainer
                          to={"/users/v/" + Auth.loggedInUser().id}
                        >
                          <Button color="link">Your profile</Button>
                        </LinkContainer>
                      </DropdownItem>
                      <DropdownItem>
                        <Button color="link" onClick={this.toggleLogin}>
                          Re-authenticate
                        </Button>
                      </DropdownItem>
                      <DropdownItem>
                        <Button color="link" onClick={this.handleLogout}>
                          Logout
                        </Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </NavItem>
            </Nav>
          </Navbar>

          <div className="content">
            <Route exact path="/" component={Dashboard} />

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
              render={props => (
                <DinnerEdit
                  {...props}
                  isCreating={false}
                  loginFunc={this.setLoginVisibility}
                />
              )}
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
            {this.state.showLogin && (
              <LoginPopup
                toggleHandler={toggleHandler}
                loginHandler={loginHandler}
              />
            )}
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
