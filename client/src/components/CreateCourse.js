import React, { useState, useContext } from "react";
import { Context } from "../Context";
import data from "../Data";

function CreateCourse({ history }) {
  const { actions, authenticatedUser } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    // ver si pongo bycrypt aca
    const { emailAddress, password } = authenticatedUser;
    const course = {
      title,
      description,
      estimatedTime: estimatedTime === "" ? null : estimatedTime,
      materialsNeeded: materialsNeeded === "" ? null : materialsNeeded,
    };
    data
      .createCourse(course, emailAddress, password)
      .then((array) => {
        if (array.length > 0) setErrors(array);
        else history.push("/");
      })
      .catch((err) => {
        console.log(err);
        history.push("/error"); // ------------------------------------------------- DEFINIR A DONDE REDIRIJO
      });
  }

  return (
    <div className="bounds course--detail">
      <h1>Create Course</h1>
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
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="input-title course--title--input"
                  placeholder="Course title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  name="description"
                  className=""
                  placeholder="Course description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      className="course--time--input"
                      placeholder="Hours"
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                    />
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      className=""
                      placeholder="List materials..."
                      value={materialsNeeded}
                      onChange={(e) => setMaterialsNeeded(e.target.value)}
                    ></textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">
              Create Course
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
    </div>
  );
}

export default CreateCourse;
