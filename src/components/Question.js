import React, { Component } from "react";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps() {
      console.warn("Question Component received new props.");
  }

  render() {
    return <h1>Question Component</h1>;
  }
}

export default Question;