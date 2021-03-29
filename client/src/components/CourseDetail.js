import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import data from "../Data";
import ReactMarkdown from "react-markdown";

function CourseDetail({ match, history }) {
  const { authenticatedUser } = useContext(Context);

  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    data
      .fetchData(`/courses/${match.params.id}`)
      .then((data) => {
        if (data === null) {
          history.push("/notfound");
        } else {
          setCourse(data);
          setUser(data.User);
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  }, []);

  function handleDelete() {
    const { emailAddress, password } = authenticatedUser;
    data
      .deleteCourse(course.id, emailAddress, password)
      .then((array) => {
        if (array.length > 0) alert(array);
        else history.push("/");
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  }

  return (
    <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            {authenticatedUser && authenticatedUser.id === course.userId ? (
              <span>
                <Link className="button" to={`${match.url}/update`}>
                  Update Course
                </Link>
                <Link className="button" to="/courses" onClick={handleDelete}>
                  Delete Course
                </Link>
              </span>
            ) : null}
            <Link className="button button-secondary" to="/courses">
              Return to List
            </Link>
          </div>
        </div>
      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
            <p>By {`${user.firstName} ${user.lastName}`}</p>
          </div>
          <div className="course--description">
            <ReactMarkdown>{course.description}</ReactMarkdown>
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>
                  {course.estimatedTime ? course.estimatedTime : "Unspecified"}
                </h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                {course.materialsNeeded ? (
                  <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                ) : (
                  "None"
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
