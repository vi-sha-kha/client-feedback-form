// //const express = require("express");
// //const mysql = require("mysql2");
// const express = require("express");
// const mysql = require("mysql2");
// const bodyParser = require("body-parser");

// const jwt = require("jsonwebtoken");

// const { response } = require("express");

// const cors = require("cors");
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "vishace74",
//   database: "ht",
// });

// connection.connect((error) => {
//   if (error) {
//     console.error("Error connecting to MySQL:", error);
//   } else {
//     console.log("Connected to MySQL database!");
//   }
// });

// app.post("/api/login", (req, res) => {
//   const user = req.body.username;
//   const password = req.body.password;

//   const sqlSearch = "SELECT * FROM admin WHERE username = ?";
//   const search_query = mysql.format(sqlSearch, [user]);

//   connection.query(search_query, async (err, result) => {
//     if (err) {
//       console.error("Error executing SQL query:", err);
//       return res.sendStatus(500);
//     }

//     if (result.length === 0) {
//       console.log("User does not exist");
//       return res.sendStatus(404);
//     }

//     const hashedPassword = result[0].password;
//     if (hashedPassword === password) {
//       console.log("Login Successful");
//       console.log("Generating accessToken");
//       const token = jwt.sign({ user: user }, "secret", {
//         expiresIn: "15m",
//       });
//       console.log(token);
//       res.json({ accessToken: token });
//     } else {
//       console.log("Password incorrect");
//       res.send("Password incorrect!");
//     }
//   });
// });

// // app.get("/api/logindata", (req, res) => {
// //   // Retrieve the username and password from the query parameters
// //   const { username, password } = req.body.query;

// //   if (username === "admin" && password === "pass") {
// //     // Authentication successful
// //     res.json({ authenticated: true });
// //   } else {
// //     // Authentication failed
// //     res.json({ authenticated: false });
// //   }
// // });

// app.post("/api/submit", (req, res) => {
//   let name = req.body.name;
//   let email = req.body.email;
//   let age = req.body.age;
//   let contact = req.body.contact;
//   let message = req.body.message;
//   let satisfaction = req.body.selected_satisfaction;
//   let heard_from = req.body.selected_heard_from;

//   // Insert the form data into the MySQL table
//   const query = `INSERT INTO new_table (name, email, age, contact, message, selected_satisfaction, selected_heard_from) VALUES ('${name}', '${email}', '${age}', '${contact}', '${message}', '${satisfaction}', '${heard_from}')`;

//   connection.query(query, (error) => {
//     if (error) {
//       console.error("Error storing form submission:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//     return res.status(200).json({ message: "Form submitted successfully" });
//   });
// });

// app.post("/api/submit", (req, res) => {
//   let username = req.body.username;

//   let password = req.body.password;

//   // Insert the form data into the MySQL table
//   const query = `INSERT INTO admin (username, password) VALUES ('${username}', '${password}')`;

//   connection.query(query, (error) => {
//     if (error) {
//       console.error("Error storing form submission:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//     return res.status(200).json({ message: "Form submitted successfully" });
//   });
// });

// app.get("/api/data", (req, res) => {
//   // Retrieve data from the MySQL table
//   const query = "SELECT * FROM new_table";
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error("Error retrieving data from MySQL:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//     return res.status(200).json(results);
//   });
// });

// // Rest of the code...

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vishace74",
  database: "ht",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
  } else {
    console.log("Connected to MySQL database!");
  }
});

app.post("/api/login", (req, res) => {
  const user = req.body.username;
  const password = req.body.password;

  const sqlSearch = "SELECT * FROM admin WHERE username = ?";
  const search_query = mysql.format(sqlSearch, [user]);

  connection.query(search_query, async (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.sendStatus(500);
    }

    if (result.length === 0) {
      console.log("User does not exist");
      return res.sendStatus(404);
    }

    const hashedPassword = result[0].password;
    if (hashedPassword === password) {
      console.log("Login Successful");
      console.log("Generating accessToken");
      const token = jwt.sign({ user: user }, "secret", {
        expiresIn: "15m",
      });
      console.log(token);
      res.json({ accessToken: token });
    } else {
      console.log("Password incorrect");
      res.send("Password incorrect!");
    }
  });
});

app.post("/api/submit", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let age = req.body.age;
  let contact = req.body.contact;
  let message = req.body.message;
  let satisfaction = req.body.selected_satisfaction;
  let heard_from = req.body.selected_heard_from;

  // Insert the form data into the MySQL table
  const query = `INSERT INTO new_table (name, email, age, contact, message, selected_satisfaction, selected_heard_from) VALUES ('${name}', '${email}', '${age}', '${contact}', '${message}', '${satisfaction}', '${heard_from}')`;

  connection.query(query, (error) => {
    if (error) {
      console.error("Error storing form submission:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Form submitted successfully" });
  });
});

app.get("/api/data", (req, res) => {
  // Retrieve data from the MySQL table
  const query = "SELECT * FROM new_table";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving data from MySQL:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(results);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
