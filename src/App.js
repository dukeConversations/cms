import "./App.css";
import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
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
          <ul className="header">
            <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/students">Students</NavLink>
            </li>
            <li>
              <NavLink to="/professors">Professors</NavLink>
            </li>
            <li>
              <NavLink to="/dinners">Dinners</NavLink>
            </li>
            <li>
              <NavLink to="/selection">Selection</NavLink>
            </li>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/checkIn">Check In</NavLink>
            </li>
          </ul>
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
