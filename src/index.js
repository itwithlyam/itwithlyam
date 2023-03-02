import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Dashboard,
  Location,
  UserLocations,
  UserLocation
} from "./components";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:id" element={<Location />} />
      <Route path="/location/:id" element={<UserLocation />} />
      <Route path="/location" element={<UserLocations />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

