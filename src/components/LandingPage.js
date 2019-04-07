import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const LandingPage = props => {
  // TODO: If logged-in and user visits this site, open it as it is.

  return (
    <div className="container">
      <h1>Welcome to React-Quiz</h1>
      <p>Start practicing your quiz skills</p>
      <p>Auto Generated quizes every 15 minutes</p>

      {props.auth.uid ? (
        <Link to="/dashboard">Dashboard</Link>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(LandingPage);
