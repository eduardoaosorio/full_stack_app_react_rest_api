import React, { useState } from "react";
import Cookies from "js-cookie";
import data from "./Data";

export const Context = React.createContext();

export const Provider = (props) => {
  // Cookies.getJSON() reads a cookie and parses its stringified value to JSON
  const [authenticatedUser, setAuthenticatedUser] = useState(
    Cookies.getJSON("authenticatedUser") || null
  );

  async function signIn(emailAddress, password) {
    const user = await data.getUser(emailAddress, password);
    if (user !== null) {
      setAuthenticatedUser(user);
      // The first argument passed to Cookies.set() specifies the name of the cookie to set
      // The second argument specifies the value to store in the cookie
      // The last argument is to set additional cookie options -- for example, an expiration for 1 day
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  function signOut() {
    setAuthenticatedUser(null);
    Cookies.remove("authenticatedUser");
  }

  return (
    <Context.Provider
      value={{
        authenticatedUser,
        actions: {
          signIn,
          signOut,
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
