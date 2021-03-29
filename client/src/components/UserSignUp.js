import React, { useState, useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import data from "../Data";

function UserSignUp({ history }) {
  const { actions } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    data
      .createUser({ firstName, lastName, emailAddress, password })
      .then((array) => {
        if (array.length) {
          setErrors(array);
        } else {
          actions.signIn(emailAddress, password).then(() => {
            history.push("/");
          });
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  }

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
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
                id="firstName"
                name="firstName"
                type="text"
                className=""
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className=""
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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
                Sign Up
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
          Already have a user account? <Link to="/signin">Click here</Link> to
          sign in!
        </p>
      </div>
    </div>
  );
}

export default UserSignUp;
