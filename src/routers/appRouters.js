import React, { Component, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
const HomeComponent = React.lazy(() => import("../components/home"));
const LoginComponent = React.lazy(() => import("../components/login"));
const RegisterComponent = React.lazy(() => import("../components/register"));
const ReadLaterComponent = React.lazy(() =>import("../components/readLater"))
const ProfileComponent = React.lazy(() =>import("../components/profile"))

const checkAuth = () => {
  let user = JSON.parse(localStorage.getItem("user"))|| {};
  if (user && user.username) {
    return true;
  } else {
    return false;
  }
};

class AppRoute extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Suspense fallback={<div>Loading</div>}>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route
              exact
              path="/login"
              render={(props) =>
                checkAuth() ? (
                  <Redirect to="/home" />
                  
                ) : (
                  <LoginComponent {...props} />
                )
              }
            />
            <Route exact path="/register" render={(props) => <RegisterComponent {...props} /> } />
            <Route exact path="/home"  render={(props) =>
              checkAuth() ? (
                <HomeComponent {...props} />
              ) : (
                <Redirect to="/login" />
              ) } />
            <Route exact path="/readlater"  render={(props) =>
              checkAuth() ? (
                <ReadLaterComponent {...props} />
              ) : (
                <Redirect to="/login" />
              ) } />
              <Route exact path="/profile"  render={(props) =>
              checkAuth() ? (
                <ProfileComponent {...props} />
              ) : (
                <Redirect to="/login" />
              ) } />
          </Suspense>
        </Switch>
      </Router>
    );
  }
}
export default AppRoute;
