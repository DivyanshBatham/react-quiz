import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Styles:
import "./bootstrap-grid.min.css";
import "./Root.scss";

// Components:
import App from "./components/App";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import FullPageSpinner from "./components/spinner/FullPageSpinner.js";

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // https://reacttraining.com/react-router/web/example/auth-workflow
  PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          this.props.auth.uid ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  };

  render() {
    if (!this.props.auth.isLoaded) return <FullPageSpinner />;
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <this.PrivateRoute path="/app" component={App} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Root);
