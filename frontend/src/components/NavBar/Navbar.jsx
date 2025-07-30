import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);
  return (
    <div className="Navbar">
      <div className="logo">
        <i className="fa-solid fa-clipboard"></i>
      </div>

      <div className="hamBurgerMenu">
        <i
          className="fa-solid fa-bars"
          onClick={() => {
            setHamburger(!hamburger);
          }}
        ></i>
      </div>
      {hamburger ? (
        <div className="menu-Links">
          <div className="close">
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                setHamburger(!hamburger);
              }}
            ></i>
          </div>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/notes/:id">Dashboard</Link>
            <Link to="/about">About</Link>
            <Link to="/signin">Signin</Link>
          </div>
        </div>
      ) : (
        <></>
      )}

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
