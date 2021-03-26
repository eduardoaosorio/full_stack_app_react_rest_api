import React, { useContext, useEffect } from "react";
import { Context } from "../Context";
import { Redirect } from "react-router-dom";

function UserSignOut() {
  const { actions } = useContext(Context);
  useEffect(() => actions.signOut());
  return <Redirect to="/" />;
}

export default UserSignOut;
