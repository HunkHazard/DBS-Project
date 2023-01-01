import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Search from "./Components/Search";
import Fine from "./Components/Fine";
import Main from "./Components/Main";
import Signout from "./Components/Signout";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* {component} */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fine" element={<Fine />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signout" element={<Signout />} />
      </Routes>
    </div>
  );
}

export default App;
