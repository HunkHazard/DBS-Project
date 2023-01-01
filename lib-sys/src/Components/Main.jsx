import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";

export default function Main() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const issueBook = (b, c) => {
    console.log(b);
    console.log(c);
  };

  const submitQuery = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Query: query,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });

    console.log(books);
  };

  return (
    <div>
      <Navbar />
      <h1>Lib-Sys</h1>
      <div className="section">
        <h2 className="center">Welcome to Lib-Sys</h2>
        <h3 className="center-">Search</h3>
        <div className="center">
          <form className="d-flex" onSubmit={submitQuery}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={submitQuery}
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="section">
        <h5 className="center-">Results</h5>
        <table className="table">
          <thead>
            <tr key={"old"}>
              <th key={6} scope="col">
                #
              </th>
              <th key={7} scope="col">
                Book Name
              </th>
              <th key={8} scope="col">
                Author
              </th>
              <th key={9} scope="col">
                Genre
              </th>
              <th key={10} scope="col">
                Publisher
              </th>
              <th key={10} scope="col">
                Status
              </th>
              <th key={10} scope="col">
                Borrow
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => {
              return (
                <tr>
                  <th key={book["title"] + 1} scope="row">
                    {index + 1}
                  </th>
                  <td key={book["title"]}>{book["title"]}</td>
                  <td key={book["fname"]}>
                    {book["fname"]} {book["lname"]}
                  </td>
                  <td key={book["genre"]}>{book["genre"]}</td>
                  <td key={book["publisher"]}>{book["publisher"]}</td>
                  <td key={book["status"]}>
                    {book["status"] == "true" ? "Available" : "Not Available"}
                  </td>
                  <td key={"something"}>
                    {book["status"] == "true" ? (
                      <button
                        type="submit"
                        onClick={() => {
                          issueBook(book["bid"], book["cid"]);
                        }}
                      >
                        Issue
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
