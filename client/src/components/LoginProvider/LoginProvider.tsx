import React from "react";
import { withCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

export const LoginProvider = ({ cookies, children }) => {
  if (cookies.get("login-token")) {
    return children;
  } else {
    return <Redirect to="/" />;
  }
};

export default withCookies(LoginProvider);
