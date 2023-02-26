import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    styled,
    Button,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";

  import { Link } from "react-router-dom";
  
  const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px auto 0 auto;
  `;
  const THead = styled(TableRow)`
    background: #000;
    & > th {
      color: #fff;
      font-size: 20px;
    }
  `;
  const TBody = styled(TableRow)`
    & > td {
      font-size: 20px;
    }
  `;
  
  export const AllUsers = () => {
    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);
    const getdata = async () => {
        
        const res = await fetch("http://localhost:8007/getusers",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])
  

    const deleteUser = async (id) => {

        const res2 = await fetch(`http://localhost:8007/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            
            getdata(); 
        }

    }
  
    return (
      <div>
        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
             
              <TableCell></TableCell>
            </THead>
          </TableHead>
          <TableBody>
            {getuserdata.map((el) => (
              <TBody>
                <TableCell>{el.id}</TableCell>
                <TableCell>{el.Fname}</TableCell>
                <TableCell>{el.Lname}</TableCell>
                <TableCell>{el.mobile}</TableCell>
                <TableCell>{el.email}</TableCell>
                
                <TableCell>
                  <Button variant="contained" component={Link} to={`/edit/${el.id}`}>
                    Edit
                  </Button>
                  <Button onClick={()=> deleteUser(el.id)} variant="contained" style={{marginLeft:10, backgroundColor:"red"}}>Delete</Button>
                </TableCell>
              </TBody>
            ))}
          </TableBody>
        </StyledTable>
      </div>
    );
  };
