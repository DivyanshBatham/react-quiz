import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Sidenav from "./Sidenav";
// import Home from "./home/home";
import AddQuestion from "./question/AddQuestion";
import Compete from "./compete/Compete";
import Quiz from "./compete/Quiz";
import FullPageSpinner from "../spinner/FullPageSpinner";
import Placeholder from "./Placeholder";

class Dashboard extends Component {
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
  }

  render() {
    // if (!this.props.auth.isLoaded) return <FullPageSpinner/>
    // if (!this.props.auth.uid) return <Redirect to="/login" />;

    return (
      <div className="dashboard">
        <Sidenav
          prefixURL={this.props.match.url}
          profile={this.props.profile}
        />
        {/* <Route exact path={this.props.match.url} component={Home} /> */}
        <Route exact path={this.props.match.url}  render={ () => <Placeholder title="Dashboard"/>}  />
        <Route
          exact
          path={`${this.props.match.url}/compete`}
          component={Compete}
        />
        <Route
          path={`${this.props.match.url}/compete/quiz/:id`}
          component={Quiz}
        />
        <Route path={`${this.props.match.url}/practice`} render={ () => <Placeholder title="Practice"/>} />
        <Route
          path={`${this.props.match.url}/add_question`}
          component={AddQuestion}
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

export default connect(mapStateToProps)(Dashboard);
