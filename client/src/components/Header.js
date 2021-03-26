import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

function Header() {
  const { authenticatedUser } = useContext(Context);

  return (
    <Fragment>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">
            <Link to="/courses">Courses</Link>
          </h1>
          <nav>
            {authenticatedUser ? (
              <React.Fragment>
                <span>Welcome, {authenticatedUser.firstName}!</span>
                <Link className="signout" to="/signout">
                  Sign Out
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">
                  Sign Up
                </Link>
                <Link className="signin" to="/signin">
                  Sign In
                </Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
      <hr />
    </Fragment>
  );
}

export default Header;
