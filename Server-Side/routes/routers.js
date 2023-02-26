const express = require("express");
const router = new express.Router();
const connection = require("../db/db.js");

//register
router.post("/create", (req, res) => {
  //   console.log(req.body);

  const { Fname, Lname, email, mobile } = req.body;

  if (!Fname || !Lname || !email || !mobile) {
    res.status(422).json("Please fill the required data");
  }
  try {
    connection.query(
      "SELECT * FROM contacts WHERE email = ?",
      email,
      (err, result) => {
        if (result.length) {
          res.status(422).json("Email Is already registered");
        } else {
          connection.query(
            "INSERT INTO contacts SET ?",
            {Fname, Lname, email, mobile},
            (err, result) => {
              if (err) {
                console.log("err" + err);
              } else {
                res.status(200).json(req.body);
              }
            }
          );
        }
      }
    );
  } catch (err) {
    // console.log(err.message);
    res.status(422).json(err);
  }
});

// get data
router.get("/getusers",(req,res)=>{
    connection.query("SELECT * FROM contacts",(err,result)=>{
      if(err){
        res.status(422).json("User Not Found!")
      }else{
        res.status(201).json(result)
      }
    })
})

// user delete api

router.delete("/deleteuser/:id",(req,res)=>{

  const {id} = req.params;

  connection.query("DELETE FROM contacts WHERE id = ? ",id,(err,result)=>{
      if(err){
          res.status(422).json("err");
      }else{
          res.status(201).json(result);
      }
  })
});

// get single user

router.get("/induser/:id",(req,res)=>{

  const {id} = req.params;

  connection.query("SELECT * FROM contacts WHERE id = ? ",id,(err,result)=>{
      if(err){
          res.status(422).json("error");
      }else{
          res.status(201).json(result);
      }
  })
});

//update details

router.patch("/updateuser/:id",(req,res)=>{

  const {id} = req.params;

  const data = req.body;

  connection.query("UPDATE contacts SET ? WHERE id = ? ",[data,id],(err,result)=>{
      if(err){
          res.status(422).json({message:"error"});
      }else{
          res.status(201).json(result);
      }
  })
});


module.exports = router;
