const express = require("express");
const app = express();
const cors = require("cors");
require("./db/db");
const router = require("./routes/routers");
const mysql = require("mysql");
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(8007, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("Listening on port 8007");
  }
});
