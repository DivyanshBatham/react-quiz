import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Components:
import Sidenav from "./Sidenav";
import Dashboard from "./dashboard/Dashboard";
import Compete from "./compete/Compete";
import Quiz from "./compete/quiz/Quiz";
import Practice from "./practice/Practice";
import Contribute from "./contribute/Contribute";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
    return (
      <div className="app">
        <Sidenav
          prefixURL={this.props.match.url}
          profile={this.props.profile}
        />
        <Route
          exact
          path={this.props.match.url}
          render={() => <Redirect to="/app/dashboard" />}
        />
        <Route
          exact
          path={`${this.props.match.url}/dashboard`}
          component={Dashboard}
        />
        <Route
          exact
          path={`${this.props.match.url}/compete`}
          component={Compete}
        />
        <Route path={`${this.props.match.url}/compete/:quizId`} component={Quiz} />
        
        <Route
          exact
          path={`${this.props.match.url}/practice`}
          component={Practice}
        />
        <Route
          path={`${this.props.match.url}/add_question`}
          component={Contribute}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("Dashboard's mapStateToProps ", state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(App);
