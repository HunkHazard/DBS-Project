import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, Navigate, Route, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Profile from "./Profile";
import Navbar from "./Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // app.get('/api/all-books', (req, res) => {
  //     const sqlSelect = "SELECT book_id,title FROM Book";
  //     db.query(sqlSelect, (err, result) => {
  //         res.send(result);
  //     });
  // });

  function testPass() {
    let flag = false;
    flag =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!#\$\%&\^\@\*\(\).*)/.test(
        password
      );

    if (flag === true) {
      submitCredentials();
    } else {
      console.log("Bozo");
    }
  }

  const navigatetoProfile = () => {
    navigate("/profile");
    // , { state: username }
  };

  const submitCredentials = () => {
    Axios.post("http://localhost:3001/login", {
      userName: username,
      password: password,
    })
      .then((response) => {
        const all_users = response.data;
        console.log(response.data);

        let flag = false;
        for (let index = 0; index < all_users.length; index++) {
          if (
            all_users[index]["username"] === username &&
            all_users[index]["password"] == password
          ) {
            console.log("Found!");
            window.localStorage.setItem("username", username);
            console.log(window.localStorage.getItem("username"));
            flag = true;
            navigatetoProfile();

            break;
          }
        }
        if (!flag) {
          console.log("User not found!");
        }
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return (
    <div>
      <Navbar />
      <h1 className="form_title">Login</h1>
      <div className="formmsg formmsgerror" />
      <div className="formmsg formmsgsuccess" />
      <div className="form_input_group">
        <input
          type="text"
          className="form_input"
          autoFocus=""
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <div className="forminputerrormsg" />
      </div>
      <div className="form_input_group">
        <input
          type="text"
          className="form_input"
          autoFocus=""
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="forminputerrormsg" />
      </div>
      <button className="form_btn" type="submit" onClick={submitCredentials}>
        Submit
      </button>
      <p className="form_text">
        <a className="form_link" href="/signup" id="linkCreateAccount">
          Don't have an account? Create account
        </a>
      </p>
    </div>
  );
}
