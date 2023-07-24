// const generateAccessToken = require("./generateAccessToken");
//import the generateAccessToken function
//LOGIN (AUTHENTICATE USER, and return accessToken)
app.post("api/login", (req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "Select * from admin where username = ?";
    const search_query = mysql.format(sqlSearch, [user]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;
      if (result.length == 0) {
        console.log("--------> User does not exist");
        res.sendStatus(404);
      } else {
        const hashedPassword = result[0].password;
        //get the hashedPassword from result
        if (hashedPassword == password) {
          console.log("---------> Login Successful");
          console.log("---------> Generating accessToken");
          const jwt = require("jsonwebtoken");

          jwt.sign(user, "secret", {
            expiresIn: "15m",
          });
          const token = generateAccessToken({ user: user });
          console.log(token);
          res.json({ accessToken: token });
        } else {
          res.send("Password incorrect!");
        }
      } //end of User exists
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.post()
//module.exports = generateAccessToken;
