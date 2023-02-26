const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Raja@123",
  database: "gopaladb",
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("DB Connect");
  }
});

module.exports = connection;
