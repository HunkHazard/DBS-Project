const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vader1064",
  database: "Library",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
  res.send("hell0");
});

app.post("/fines", (req, res) => {
  let current_user = req.body.userName;

  const member_id_query = "select member_id from Member where username = ?";
  db.query(member_id_query, [current_user], (err, result) => {
    console.log(result);
    const member_id = result[0].member_id;
    // insert new fines if not added already
    const sql_new_Fines =
      "insert into Fine (member_id,book_id,copy_id,days_overdue,amount) select i.member_id, i.book_id, i.copy_id,datediff( curdate() , i.date_due),datediff(curdate() , i.date_due) * 10 from Issue as i  left join Fine as f on i.member_id = f.member_id and i.book_id = f.book_id and i.copy_id = f.copy_id where f.member_id is null and i.member_id = ? and i.date_due < curdate();";

    db.query(sql_new_Fines, [member_id], (err, result) => {
      console.log(result);
    });

    const update_fines =
      "update Fine as f join Issue as i on f.member_id = i.member_id and f.book_id = i.book_id and f.copy_id = i.copy_id set f.days_overdue = datediff( curdate() , i.date_due ),f.amount = datediff( curdate() , i.date_due) * 10 where f.member_id = ?;";

    db.query(update_fines, [member_id], (err, result) => {
      console.log(result);
    });

    const sqlFines =
      "select f.book_id as id, b.title as title, f.amount as amount,f.days_overdue as days_overdue from Fine as f join Member as m on f.member_id = m.member_id join Book as b on f.book_id = b.book_id where m.username = ?;";
    db.query(sqlFines, [current_user], (err, result) => {
      console.log(result);
      res.send(result);
      res.end();
    });
  });
});

//for the search bar on the home page
app.post("/search", (req, res) => {
  const name = req.body.Query;
  console.log(name);
  const search = "%" + name + "%";
  console.log(search);
  const search_query =
    "select * from all_books where title like ? or fname like ? or lname like ? or genre like ? or publisher like ?;";

  db.query(
    search_query,
    [search, search, search, search, search],
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

// to issue books to the users
// have to add a check for different quantities of books for student and faculty

app.post("/issueBook", (req, res) => {
  const name = req.body.userName;
  const book_id = req.body.book_id;
  const copy_id = req.body.copy_id;
  let member_id;

  const id_query = "select * from Member where username = ?";

  // get all user data from the database
  db.query(id_query, name, (err, result) => {
    member_id = result[0].member_id;
    console.log(member_id);
    console.log(result);

    // get the date issued
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    date_issued = yyyy + "-" + mm + "-" + dd;

    // check if the user is a student or a faculty
    if (result[0].student_id != null) {
      console.log("student");

      const limit_check_query =
        "select count(*) as count from Issue where member_id = ?";

      // check if the user has already issued 5 books
      db.query(limit_check_query, [member_id], (err, result) => {
        console.log(result[0].count);
        if (result[0].count === 5) {
          console.log("limit reached");
          res.send(false);
          return;
        } else {
          console.log("limit not reached");

          today.setDate(today.getDate() + 15); // add 15 days to the current date
          dd = String(today.getDate()).padStart(2, "0");
          mm = String(today.getMonth() + 1).padStart(2, "0");
          yyyy = today.getFullYear();

          date_due = yyyy + "-" + mm + "-" + dd;

          console.log(date_issued);
          console.log(date_due);

          const issue_query = "insert into Issue values (?,?,?,?,?)";
          db.query(
            issue_query,
            [member_id, book_id, copy_id, date_issued, date_due],
            (err, result) => {
              console.log(err);
              res.send(true);
            }
          );
        }
      });
      // if the user is a faculty
    } else if (result[0].faculty_id != null) {
      console.log("faculty");

      // check if the user has already issued 10 books
      const limit_check_query =
        "select count(*) as count from Issue where member_id = ?";
      db.query(limit_check_query, [member_id], (err, result) => {
        console.log(result[0].count);
        if (result[0].count === 10) {
          console.log("limit reached");
          res.send(false);
          return;
        } else {
          console.log("limit not reached");
          today.setDate(today.getDate() + 20); // add 20 days to the current date
          dd = String(today.getDate()).padStart(2, "0");
          mm = String(today.getMonth() + 1).padStart(2, "0");
          yyyy = today.getFullYear();

          date_due = yyyy + "-" + mm + "-" + dd;

          console.log(date_issued);
          console.log(date_due);

          const issue_query = "insert into Issue values (?,?,?,?,?)";
          db.query(
            issue_query,
            [member_id, book_id, copy_id, date_issued, date_due],
            (err, result) => {
              console.log(err);
              res.send(true);
            }
          );
        }
      });
    }
  });
});

app.post("/profile", (req, res) => {
  let current_user = req.body.userName;
  console.log(current_user);

  const sqlProfile = "SELECT * FROM Member WHERE username = ?";
  db.query(sqlProfile, [current_user], (err, result) => {
    res.send(result);
    res.end();
  });
});

app.post("/booksIssued", (req, res) => {
  username = req.body.userName;

  const issuedBooks =
    "select b.title as title, a.first_name as first_name,a.last_name as last_name,i.date_due as due_date from Issue as i join Member as m on i.member_id = m.member_id join Book as b on i.book_id = b.book_id join Author as a on b.author_id = a.author_id where m.username = ?";
  db.query(issuedBooks, [username], (err, result) => {
    console.log(result);
    res.send(result);
    res.end();
  });
});

app.post("/login", (req, res) => {
  const current_user = req.body.userName;
  const password = req.body.password;

  const validate = "select username,password from Member";

  db.query(validate, (err, result) => {
    res.send(result);
    res.end();
  });
});

app.post("/signup", (req, res) => {
  const username = req.body.userName;
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const emailaddress = req.body.emailAddress;
  const phonenumber = req.body.phoneNumber;
  const dateofbirth = req.body.dateOfBirth;
  const password = req.body.password;
  const studentstate = req.body.Student;
  const facultystate = req.body.Faculty;
  console.log(emailaddress);
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
