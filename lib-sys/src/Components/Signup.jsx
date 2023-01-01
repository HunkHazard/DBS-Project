import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate, Route, useNavigate } from "react-router-dom";
import "./loginstyle.css";
import { useEffect } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailaddress, setEmailAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [dateofbirth, setDateofBirth] = useState("");
  const [student, setStudent] = useState(false);
  const [faculty, setFaculty] = useState(false);
  const [section, setSection] = useState("");
  const [stdclass, setStdClass] = useState("");
  const [department, setDepartment] = useState("");

  const navigatetoProfile = () => {
    navigate("/profile", { state: username });
  };

  function testPass(inputElement) {
    console.log("testPass");
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!#\$\%&\^\@\*\(\).*)/.test(
      inputElement
    );
  }

  function testUsername(inputElement) {
    if (inputElement.length < 25) {
      console.log("testUsername = true");
      return true;
    }
    return false;
  }

  function testEmailAddress(inputElement) {
    console.log("testEmailAddress");
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputElement);
  }

  function testPhoneNumber(inputElement) {
    console.log("testPhoneNumber");
    return /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(inputElement);
  }

  function validateBirthday(birthday) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
      return false;
    }
    let parts = birthday.split("-");
    let now = new Date();
    let year = parseInt(parts[0], 10);
    let currentYear = now.getFullYear();
    let month =
      parts[1][0] === "0" ? parseInt(parts[1][1], 10) : parseInt(parts[1], 10);
    let day =
      parts[2][0] === "0" ? parseInt(parts[2][1], 10) : parseInt(parts[2], 10);

    if (year >= currentYear) {
      return false;
    }
    if (currentYear - year < 15 || currentYear - year > 80) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    if (day < 1 || day > 31) {
      return false;
    }
    return true;
  }

  const submitProfile = () => {
    const dict = {
      userName: username,
      firstName: firstname,
      lastName: lastname,
      emailAddress: emailaddress,
      phoneNumber: phonenumber,
      dateOfBirth: dateofbirth,
      password: password,
      Student: student,
      Faculty: faculty,
      stdClass: stdclass,
      Section: section,
      Department: department,
    };

    const api = "http://localhost:3001/signup";

    axios.post(api, dict);
    // .then((response) => {
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   if (error.response) {
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //   } else if (error.request) {
    //     console.log(error.request);
    //   } else {
    //     console.log("Error", error.message);
    //   }
    //   console.log(error.config);
    // });
  };

  function validateEverything() {
    let flag = false;
    if (
      testUsername(username) &&
      testPass(password) &&
      testUsername(firstname) &&
      testUsername(lastname) &&
      testEmailAddress(emailaddress) &&
      testPhoneNumber(phonenumber) &&
      validateBirthday(dateofbirth) &&
      password === confirmpassword
    ) {
      flag = true;
      console.log("validate everything");
      submitProfile();
    } else {
      console.log("Bozo");
    }
  }

  return (
    <form className="form" id="createaccount">
      <h1 className="form_title">Create account</h1>
      <div className="formmsg formmsgerror" />
      <div className="formmsg formmsgsuccess" />
      <div className="form_input_group">
        <input
          type="text"
          id="createUsername"
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
          id="firstName"
          className="form_input"
          autoFocus=""
          placeholder="First Name"
          onChange={(event) => {
            setFirstname(event.target.value);
          }}
        />
        <div className="forminputerrormsg" />
      </div>
      <div className="form_input_group">
        <input
          type="text"
          id="lastName"
          className="form_input"
          autoFocus=""
          placeholder="Last Name"
          onChange={(event) => {
            setLastname(event.target.value);
          }}
        />
        <div className="forminputerrormsg" />
      </div>
      <div className="form_input_group">
        <input
          type="text"
          id="emailAddress"
          className="form_input"
          autoFocus=""
          placeholder="Email Address"
          onChange={(event) => {
            setEmailAddress(event.target.value);
          }}
        />
        <div className="forminputerrormsg" />
      </div>
      <div className="form_input_group">
        <input
          type="text"
          id="phoneNumber"
          className="form_input"
          autoFocus=""
          placeholder="Phone Number"
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
        />
        <div className="forminputerrormsg" />
      </div>
      <div className="form_input_group">
        <input
          type="text"
          id="dateOfBirth"
          className="form_input"
          autoFocus=""
          placeholder="Date of Birth(Format: YYYY-MM-DD)"
          onChange={(event) => {
            setDateofBirth(event.target.value);
          }}
        />
        <div className="forminputerrormsg" />
      </div>
      <div className="form_input_group">
        <input
          type="text"
          id="createPassword"
          className="form_input"
          autoFocus=""
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="forminputerrormsg" />
      </div>
      <div className="form_input_group">
        <input
          type="text"
          id="confirmPassword"
          className="form_input"
          autoFocus=""
          placeholder="Confirm password"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
        <div className="forminputerrormsg" />
      </div>
      {/* <div> */}
      <label className="radiocontainer">
        Student
        <input
          type="radio"
          defaultChecked="checked"
          name="radio"
          onClick={() => {
            setStudent(true);
            setFaculty(false);
          }}
        />
        <span className="checkmark" />
      </label>
      {student && (
        <div>
          <input
            type="text"
            id="class"
            className="form_input"
            autoFocus=""
            placeholder="Class"
            onChange={(event) => {
              setStdClass(event.target.value);
            }}
          />
          <input
            type="text"
            id="section"
            className="form_input"
            autoFocus=""
            placeholder="Section"
            onChange={(event) => {
              setSection(event.target.value);
            }}
          />
        </div>
      )}
      <label className="radiocontainer">
        Faculty
        <input
          type="radio"
          name="radio"
          onClick={() => {
            setFaculty(true);
            setStudent(false);
          }}
        />
        <span className="checkmark" />
      </label>
      {faculty && (
        <div>
          <input
            type="text"
            id="department"
            className="form_input"
            autoFocus=""
            placeholder="Department"
            onChange={(event) => {
              setDepartment(event.target.value);
            }}
          />
        </div>
      )}

      {/* </> */}

      <button className="form_btn" type="submit" onClick={validateEverything}>
        Submit
      </button>
      <p className="form_text">
        <a className="form_link" href="/login" id="linkCreateAccount">
          Already have an account?
        </a>
      </p>
    </form>
  );
}
