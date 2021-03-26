import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import data from "../Data";

// ARREGLAR TEMA DE ERRORES CUANDO EL CURSO NO EXISTE

function CourseDetail({ match }) {
  const { authenticatedUser } = useContext(Context);

  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    data.fetchData(`/courses/${match.params.id}`).then((data) => {
      setCourse(data);
      setUser(data.User);
    });
  }, []);

  function deleteCourse() {
    console.log("clicked delete button");
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
                <Link className="button" to="/courses" onClick={deleteCourse}>
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
            <p>{course.description}</p>
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
                {course.materialsNeeded ? course.materialsNeeded : "None"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
