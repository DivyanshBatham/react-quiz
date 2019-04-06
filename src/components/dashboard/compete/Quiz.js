import React, { Component } from "react";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("Quiz, ", this.props);
    return (
      <>
        <h1>This is quiz {this.props.match.params.id}</h1>
      </>
    );
  }
}

export default Quiz;
