const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// *MIDDLEWARES* //
// Automatically parsing every adjacent that is sent from the front end
app.use(express.json());
// CORS allow the access to send information from the front end to the back end
app.use(cors());

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "password",
  database: "users",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "INSERT INTO usersdata (username, password) VALUES (?, ?)",
    [username, password],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM usersdata WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
          // The front-end expect a object, so i pass it
          // If theres any error, send it
          res.send({err: err})
      } else {
          // Else if, send the result
          if (result.length > 0) {
              res.send(result)
          } else {
              // Otherway, send this error
              res.send({message: "Wrong username or password. Try again"})
          }
      }
    }
  );
});

app.listen(420, () => {
  console.log("Running Server on port 420");
});
