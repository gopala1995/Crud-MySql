import {
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  Button,
  styled,
} from "@mui/material";
import React, { useState } from "react";

import { useHistory, useNavigate } from 'react-router-dom'

const Form = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

export const AddUsers = () => {

  const navigate = useNavigate()

  const [inpval, setINP] = useState({
    Fname: "",
    Lname: "",
    email: "",
    mobile: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const AddUser = async (e) => {
    e.preventDefault();

    const { Fname, Lname, email, mobile } = inpval;

    if (Fname == "") {
      alert(" First Name is required");
    } else if (Lname == "") {
      alert("Last Name is required");
    } else if (!email.includes("@")) {
      alert("enter valid email");
    } else if (email == "") {
      alert("email is required");
    } else if (mobile == "") {
      alert("mobile is required");
    } else {
      const res = await fetch("http://localhost:8007/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Fname,
          Lname,
          email,
          mobile,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data) {
        navigate("/")
      } else {
    
        console.log("data added");
      }
    }
  };



  return (
    <div>
      <Form>
        <Typography varient="h4">Add User</Typography>
        <FormControl>
          <InputLabel> First Name</InputLabel>
          <Input name="Fname" value={inpval.Fname} onChange={setdata} />
        </FormControl>
        <FormControl>
          <InputLabel>Last Name</InputLabel>
          <Input name="Lname" value={inpval.Lname} onChange={setdata} />
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input name="email" value={inpval.email} onChange={setdata} />
        </FormControl>
        <FormControl>
          <InputLabel>Mobile</InputLabel>
          <Input name="mobile" value={inpval.mobile} onChange={setdata} />
        </FormControl>
        <FormControl>
          <Button onClick={AddUser} variant="contained">
            Add User
          </Button>
        </FormControl>
      </Form>
    </div>
  );
};
