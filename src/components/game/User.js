import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export const User = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const userId = parseInt(localStorage.getItem("betcha_user"));

  useEffect(() => {
    fetch(`http://localhost:8088/users/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        setLoggedInUser(user);
      });
  }, []);

  return <Typography fontSize="medium"> Hi, {loggedInUser.name}</Typography>;
};
