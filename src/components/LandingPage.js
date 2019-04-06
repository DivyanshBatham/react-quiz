import React from "react";
import {Link} from "react-router-dom";

const LandingPage = () => {
    // TODO: If logged-in and user visits this site, open it as it is.
  return (
    <div className="container">
      <h1>Welcome to React-Quiz</h1>
      <p>Start practicing your quiz skills</p>
      <p>Auto Generated quizes every 15 minutes</p>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default LandingPage;
