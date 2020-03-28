import React, { Component, useContext, Fragment } from "react";
import { Link } from "react-router-dom";

import authContext from "../../context/auth/authContext";

const Header = () => {
  //auth state
  const authCtx = useContext(authContext);
  const { isAuthenticated, user, logout } = authCtx;

  const authLinks = (
    <Fragment>
      <span className="navbar-text mr-3">
        <strong>{user ? user.username : ""}</strong>
      </span>
      <li className="nav-item">
        <button
          onClick={() => logout()}
          className="nav-link btn btn-info btn-sm text-light"
        >
          Logout
        </button>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item text-nowrap">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <a className="navbar-brand" href="#">
        STG Cloud
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/stg" className="nav-link">
              Guías
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Compras
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Caja y Bancos
            </a>
          </li>
          <li className="nav-item">
            <Link to="/stg/provincias" className="nav-link">
              Provincias
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
        {/* <span className="navbar-text">Navbar text with an inline element</span> */}
      </div>
    </nav>
  );
};

export default Header;
