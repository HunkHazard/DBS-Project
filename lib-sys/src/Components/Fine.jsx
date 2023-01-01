import axios from "axios";
import React from "react";
import { Await } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";

export default function Fine() {
  const [fines, setFines] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/fines", {
        userName: window.localStorage.getItem("username"),
      })
      .then((response) => {
        setFines(response.data);
      });
  }, []);

  console.log(fines);

  return (
    <div>
      <Navbar />
      <div className="section">
        <h2 className="center-">Fines</h2>
        <table className="table">
          <thead>
            <tr key={"old"}>
              <th key={6} scope="col">
                ID
              </th>
              <th key={7} scope="col">
                Book Name
              </th>
              <th key={8} scope="col">
                Amount
              </th>
              <th key={9} scope="col">
                Days Overdue
              </th>
            </tr>
          </thead>
          <tbody>
            {fines.map((fine) => {
              return (
                <tr>
                  <th key={fine["id"] + 1} scope="row">
                    {fine["id"]}
                  </th>
                  <td key={fine["title"]}>{fine["title"]}</td>
                  <td key={fine["amount"]}>
                    {fine["amount"] === null ? "0" : fine["amount"]}
                  </td>
                  <td key={fine["days_overdue"]}>{fine["days_overdue"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
