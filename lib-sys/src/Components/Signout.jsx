import React from "react";
import { Link, Navigate, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Signout() {
  const navigate = useNavigate();

  const navigatetoHome = () => {
    navigate("/");
  };

  const returntoHome = () => {
    navigatetoHome();
  };

  const callsignout = () => {
    window.localStorage.setItem("username", "");
    navigatetoHome();
  };

  return (
    <div>
      <Navbar />
      <h3>Do you want to Singout?</h3>
      <button type="submit" onClick={returntoHome}>
        Return
      </button>
      <button type="submit" onClick={callsignout}>
        Sign-out
      </button>
    </div>
  );
}
