import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="main">
    <h1>Main</h1>
    Listing of various features and details.
    Maybe user stats too.
    </div>;
  }
}

export default Home;
