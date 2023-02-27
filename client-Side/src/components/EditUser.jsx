import {
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  Button,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

const Form = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

export const EditUser = () => {
  const navigate = useNavigate();
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

  const { id } = useParams("");
  console.log(id);
  const getdata = async () => {
    const res = await fetch(`http://localhost:8007/induser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data[0]);
      console.log("get data====", data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { Fname, Lname, email, mobile } = inpval;

    const res2 = await fetch(`http://localhost:8007/updateuser/${id}`, {
      method: "PATCH",
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

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <Form>
        <Typography varient="h4">Eite User</Typography>
        <FormControl>
          <InputLabel>First Name</InputLabel>
          <Input name="Fname" onChange={setdata} value={inpval.Fname} />
        </FormControl>
        <FormControl>
          <InputLabel>Last Name</InputLabel>
          <Input name="Lname" onChange={setdata} value={inpval.Lname} />
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input name="email" onChange={setdata} value={inpval.email} />
        </FormControl>
        <FormControl>
          <InputLabel>MobileNo</InputLabel>
          <Input name="mobile" onChange={setdata} value={inpval.mobile} />
        </FormControl>

        <FormControl>
          <Button onClick={updateuser} variant="contained">
            Save Edit
          </Button>
        </FormControl>
      </Form>
    </div>
  );
};
