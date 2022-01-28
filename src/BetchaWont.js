import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import "./BetchaWont.css";

export const BetchaWont = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("betcha_user")) {
          return (
            <>
              
              <h2>BetchaWont</h2>
              
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);