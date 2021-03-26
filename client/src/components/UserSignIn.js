import React, { useState, useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";

function UserSignIn({ history, location }) {
  const { actions } = useContext(Context);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const { from } = location.state || { from: { pathname: "/" } };
    actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors(["Sign-in was unsuccessful"]);
        } else {
          history.push(from);
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error"); // ------------------------------------------------- DEFINIR A DONDE REDIRIJO
      });
  }

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          {errors.length > 0 ? (
            <div className="validation-errors">
              <h2 className="validation--errors--label">Validation errors</h2>
              <ul>
                {errors.map((errorMsg) => (
                  <li key={btoa(errorMsg)}>{errorMsg}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <form onSubmit={handleSubmit}>
            <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                className=""
                placeholder="Email Address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className=""
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Sign In
              </button>
              <button
                className="button button-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/courses");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>
          Don't have a user account? <Link to="/signup">Click here</Link> to
          sign up!
        </p>
      </div>
    </div>
  );
}

export default UserSignIn;
