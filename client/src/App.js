import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Header from "./components/Header";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./PrivateRoute";
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <PrivateRoute path="/courses/create" component={CreateCourse} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
          <Route exact path="/courses" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signout" component={UserSignOut} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/error" component={UnhandledError} />
          <Route path="/notfound" component={NotFound} />
          <Route exact path="/" render={() => <Redirect to={"/courses"} />} />
          <Route render={() => <Redirect to={"/notfound"} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
