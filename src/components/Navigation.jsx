import React from "react";
import { NavLink } from "react-router-dom";

import './Nav.css'

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <div>
            <ul className="navbar-nav ml-auto">
              <li>
                <NavLink className="navbar-brand" to="/">
                  <img src="../../images/logo.png" style={{width: "40px"}} />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-right">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-left">
                <NavLink className="nav-link" to="/location">
                  Locations
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;