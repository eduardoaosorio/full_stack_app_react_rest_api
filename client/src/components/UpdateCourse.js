import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import data from "../Data";

// VER QUE PASA SI TRATO DE UPDATE O DELETE UN COURSE QUE NO EXISTA

function UpdateCourse({ history, match }) {
  const { authenticatedUser } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [user, setUser] = useState({});
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    data.fetchData(`/courses/${match.params.id}`).then((data) => {
      setTitle(data.title);
      setDescription(data.description);
      setEstimatedTime(data.estimatedTime);
      setMaterialsNeeded(data.materialsNeeded);
      setUser(data.User);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // updateCourse
    console.log("form submitted");
  }

  return (
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
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
              <p>By {`${user.firstName} ${user.lastName}`}</p>
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
              Update Course
            </button>
            <button
              className="button button-secondary"
              onClick={(e) => {
                e.preventDefault();
                history.goBack();
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

export default UpdateCourse;
