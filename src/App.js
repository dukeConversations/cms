import "./App.css";
import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/students/Students";
import Professors from "./pages/professors/Professors";
import Dinners from "./pages/dinners/Dinners";
import Selection from "./pages/Selection";
import Users from "./pages/users/Users";
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
            <Route exact path="/users/:id" component={Users} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
