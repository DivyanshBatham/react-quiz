import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Components:
import FullPageSpinner from "./spinner/FullPageSpinner";

const LandingPage = props => {
  // TODO: If logged-in and user visits this site, open it as it is.
  if (!props.auth.isLoaded) return <FullPageSpinner/>

  return (
  <main>
      <div className="container">
        <div className="placeholder">
          <div className="placeholder__heading">
            React-Quiz
          </div>
          <div className="placeholder__description">(Landing Page Coming Soon)</div>

          {props.auth.uid ? (
            <Link to="/app/dashboard">Dashboard</Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </main>

    // <div className="container">
    //   <h1>Welcome to React-Quiz</h1>
    //   <p>Start practicing your quiz skills</p>
    //   <p>Auto Generated quizes every 15 minutes</p>

    // </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(LandingPage);
