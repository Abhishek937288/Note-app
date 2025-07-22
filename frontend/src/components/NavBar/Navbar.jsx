import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <div className="pages">
        <Link to="/">Home</Link>
        <Link to="/notes/:id">Dashboard</Link>
        <Link to="/about">About</Link>
        <Link to="/signin">Signin</Link>
      </div>
    </div>
  );
};

export default Navbar;
