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
  password: "",
  database: "ht",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
  } else {
    console.log("Connected to MySQL database!");
  }
});

app.post("/api/token", (req, res) => {
  const id = req.body.id;
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

// Endpoint to verify the access token
// Endpoint to verify the access token and handle auto-logout
app.post("/api/verify-token", (req, res) => {
  const { accessToken } = req.body;

  // Verify the access token
  jwt.verify(accessToken, "secret", (err, decoded) => {
    if (err) {
      // Error verifying the token
      console.error("Error verifying token:", err);
      return res.status(401).json({ valid: false });
    }

    // Token is valid
    console.log("Token verified");

    // Check if the token has expired
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (decoded.exp < currentTime) {
      console.log("Token has expired. Auto-logout.");
      return res.status(401).json({ valid: false, expired: true });
    }

    // Token is still valid, continue with the application
    return res.status(200).json({ valid: true });
  });
});

app.post("/api/submit", (req, res) => {
  //let id = req.body.id;
  let name = req.body.name;
  let email = req.body.email;
  let age = req.body.age;
  let country = req.body.country;
  let countryCode = req.body.countryCode;
  let contact = req.body.contact;
  let satisfaction = req.body.selected_satisfaction;
  let stand_out = req.body.stand_out;
  let heard_from = req.body.selected_heard_from;
  let message = req.body.message;

  //const id = req.params.id;

  // Insert the form data into the MySQL table
  const query = `INSERT INTO new_table (name, email, age, country,countryCode, contact, selected_satisfaction, stand_out, selected_heard_from, message) VALUES ('${name}', '${email}', '${age}',' ${country}','${countryCode}','${contact}',  '${satisfaction}','${stand_out}', '${heard_from}','${message}')`;
  //const query = `INSERT INTO new_table [id, name,];
  connection.query(query, (error) => {
    if (error) {
      console.error("Error storing form submission:", error);
      return res.status(500).json({ message: error });
    }
    return res.status(200).json({ message: "Form submitted successfully" });
  });
});

app.get("/api/data/:id", (req, res) => {
  const id = req.params.id;

  // Retrieve data from the MySQL table for the given user ID
  const query = "SELECT * FROM new_table WHERE id = ?";
  connection.query(query, [id], (error, result) => {
    if (error) {
      console.error("Error retrieving data from MySQL:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User ID not found" });
    }

    return res.status(200).json(result[0]);
  });
});

app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;

  // Retrieve data from the MySQL table for the given user ID
  const query =
    "UPDATE  new_table SET name=?, email=?, age=?, country=?, countryCode=?, contact=?, selected_satisfaction=?, stand_out=?, selected_heard_from=?, message=? WHERE id = ?";
  connection.query(query, [id], (error, result) => {
    if (error) {
      console.error("Error retrieving data from MySQL:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User ID not found" });
    }

    return res.status(200).json(result[0]);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;

  // Insert the form data into the MySQL table
  const query = `DELETE FROM new_table where id= ?`;

  connection.query(query, id, (error) => {
    if (error) {
      console.error("Error storing form submission:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Form data deleted successfully" });
  });
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
        expiresIn: "5m",
      });

      console.log(token);

      // Store the token in the MySQL database
      const sqlInsertToken =
        "INSERT INTO token_store (user, token) VALUES (?, ?)";
      const insert_query = mysql.format(sqlInsertToken, [user, token]);
      connection.query(insert_query, (error) => {
        if (error) {
          console.error("Error storing token in database:", error);
        }
      });

      res.json({ accessToken: token });
    } else {
      console.log("Password incorrect");
      res.send("Password incorrect!");
    }
  });
});
app.get("/api/data", (req, res) => {
  // Retrieve data from the MySQL table
  // let token = req.params.token;
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

// const express = require("express");
// const mysql = require("mysql2");
// const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");
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

// app.post("/api/token", (req, res) => {
//   const id = req.body.id;
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
//         expiresIn: "5m",
//       });
//       console.log(token);
//       res.json({ accessToken: token });
//     } else {
//       console.log("Password incorrect");
//       res.send("Password incorrect!");
//     }
//   });
// });

// // Endpoint to verify the access token
// // Endpoint to verify the access token and handle auto-logout
// app.post("/api/verify-token", (req, res) => {
//   const { accessToken } = req.body;

//   // Verify the access token
//   jwt.verify(accessToken, "secret", (err, decoded) => {
//     if (err) {
//       // Error verifying the token
//       console.error("Error verifying token:", err);
//       return res.status(401).json({ valid: false });
//     }

//     // Token is valid
//     console.log("Token verified");

//     // Check if the token has expired
//     const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
//     if (decoded.exp < currentTime) {
//       console.log("Token has expired. Auto-logout.");
//       return res.status(401).json({ valid: false, expired: true });
//     }

//     // Token is still valid, continue with the application
//     return res.status(200).json({ valid: true });
//   });
// });

// app.post("/api/submit", (req, res) => {
//   // let id = req.body.id;
//   let name = req.body.name;
//   let email = req.body.email;
//   let age = req.body.age;
//   //let contact = req.body.contact;

//   let satisfaction = req.body.selected_satisfaction;
//   let stand_out = req.body.stand_out;
//   let heard_from = req.body.selected_heard_from;
//   let message = req.body.message;

//   //const id = req.params.id;

//   // Insert the form data into the MySQL table
//   const query = `INSERT INTO new_table (id,name, email, age, selected_satisfaction, stand_out, selected_heard_from, message) VALUES ('${id}','${name}', '${email}', '${age}',   '${satisfaction}','${stand_out}', '${heard_from}','${message}')`;
//   //const query = `INSERT INTO new_table [id, name,];
//   connection.query(query, (error) => {
//     if (error) {
//       console.error("Error storing form submission:", error);
//       return res.status(500).json({ message: error });
//     }
//     return res.status(200).json({ message: "Form submitted successfully" });
//   });
// });

// app.delete("/api/delete/:id", (req, res) => {
//   let id = req.body.id;
//   let name = req.body.name;
//   let email = req.body.email;
//   let age = req.body.age;
//   let contact = req.body.contact;

//   let satisfaction = req.body.selected_satisfaction;
//   let stand_out = req.body.stand_out;
//   let heard_from = req.body.selected_heard_from;
//   let message = req.body.message;

//   //const { id } = req.params;

//   // Insert the form data into the MySQL table
//   const query = `DELETE FROM new_table where id= ?`;

//   connection.query(query, id, (error) => {
//     if (error) {
//       console.error("Error storing form submission:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//     return res.status(200).json({ message: "Form data deleted successfully" });
//   });
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
//         expiresIn: "5m",
//       });

//       console.log(token);

//       // Store the token in the MySQL database
//       const sqlInsertToken =
//         "INSERT INTO token_store (user, token) VALUES (?, ?)";
//       const insert_query = mysql.format(sqlInsertToken, [user, token]);
//       connection.query(insert_query, (error) => {
//         if (error) {
//           console.error("Error storing token in database:", error);
//         }
//       });

//       res.json({ accessToken: token });
//     } else {
//       console.log("Password incorrect");
//       res.send("Password incorrect!");
//     }
//   });
// });
// app.get("/api/data", (req, res) => {
//   // Retrieve data from the MySQL table
//   // let token = req.params.token;
//   const query = "SELECT * FROM new_table";
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error("Error retrieving data from MySQL:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//     return res.status(200).json(results);
//   });
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
