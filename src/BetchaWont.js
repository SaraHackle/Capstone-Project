import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import "./BetchaWont.css";
import { NavBar } from "./components/nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import BetchaLogo from "./components/images/BetchaLogo.png";

export const BetchaWont = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("betcha_user")) {
          return (
            <div>
              <div className="pageHeader">
                <NavBar />
                <div>
                  <img className="photo" src={BetchaLogo} />
                </div>
              </div>
              <ApplicationViews />
            </div>
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
