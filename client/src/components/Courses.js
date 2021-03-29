import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../Data";

function Courses({ history }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let isMounted = true; // used in cleanUp function to prevent memory leak
    data.fetchData("/courses").then((data) => {
      if (isMounted) setCourses(data);
    });
    return function cleanUp() {
      isMounted = false;
    };
  }, [courses.length]);

  return (
    <div className="bounds">
      {courses.length > 0
        ? courses.map((course) => (
            <div key={course.id} className="grid-33">
              <Link
                className="course--module course--link"
                to={`/courses/${course.id}`}
              >
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            </div>
          ))
        : null}
      <div className="grid-33">
        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <h3 className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </h3>
        </Link>
      </div>
    </div>
  );
}

export default Courses;
