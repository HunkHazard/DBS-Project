import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  let userIsLoggedOut;
  let userIsLoggedIn;
  if (window.localStorage.getItem("username") === "") {
    userIsLoggedOut = "none";
    userIsLoggedIn = "";
  } else {
    userIsLoggedOut = "";
    userIsLoggedIn = "none";
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Lib-Sys
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item">
                <Link className="nav-link active" to={"/search"}>
                  Search
                </Link>
              </li> */}

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/login"}
                  style={{ pointerEvents: userIsLoggedIn }}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={"/signup"}
                  style={{ pointerEvents: userIsLoggedIn }}
                >
                  SignUp
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={"/fine"}
                  style={{ pointerEvents: userIsLoggedOut }}
                >
                  Fine
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={"/profile"}
                  style={{ pointerEvents: userIsLoggedOut }}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={"/signout"}
                  style={{ pointerEvents: userIsLoggedOut }}
                >
                  Signout
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link">Disabled</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
