import React, { useState, useEffect } from "react";

function UserSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
        <div>
          <form>
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className=""
                placeholder="First Name"
                value={firstName}
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
              />
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className=""
                placeholder="Confirm Password"
                value={confirmPassword}
              />
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Sign Up
              </button>
              <button
                className="button button-secondary"
                onclick="event.preventDefault(); location.href='index.html';"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>
          Already have a user account? <a href="sign-in.html">Click here</a> to
          sign in!
        </p>
      </div>
    </div>
  );
}

export default UserSignUp;
