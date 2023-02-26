import React from "react";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavHead = styled(AppBar)`
  background: #0277bd;
`;
const Tab = styled(NavLink)`
  font-size: 23px;
  color: yellow;
  margin-left: 80px;
  text-decoration: none;
`;

export const NavBar = () => {
  return (
    <>
      <NavHead position="static">
        <Toolbar>
          <Tab to="/">All User</Tab>
          <Tab to="add">Add User</Tab>
        </Toolbar>
      </NavHead>
    </>
  );
};
