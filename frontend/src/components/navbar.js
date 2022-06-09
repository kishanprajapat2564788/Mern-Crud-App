import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="top-nav">
      <div>
        <Link to="/" className="navbar-brand">
          <span className="logo">ET Exercise Track</span>
        </Link>
      </div>
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      <ul className="menu">
        <li className="navbar-item">
          <Link to="/" className="nav-link active">
            Exercises
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/create" className="nav-link">
            Create Exercise Log
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/user" className="nav-link">
            Create User
          </Link>
        </li>
      </ul>
    </section>
  );
};
export default Navbar;
