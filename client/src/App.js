import React, { useState, useEffect } from "react";

// components
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    // test connection to API
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setData(JSON.stringify(data)))
      .catch((err) => console.log("Something went wrong!\n", err));
  }, []);

  return (
    <div>
      <Header />
      {/* <Courses /> */}
      {/* <CourseDetail /> */}
      {/* <UserSignIn /> */}
      {/* <UserSignUp /> */}
      {/* <CreateCourse /> */}
      <UpdateCourse />
    </div>
  );
}

export default App;
