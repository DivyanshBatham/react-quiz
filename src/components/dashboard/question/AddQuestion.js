import React, { Component } from "react";
import {connect} from "react-redux";
import { createQuestion } from "../../../actions/questionActions";

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  handleAddQuestion = event => {
    event.preventDefault();

    // let email = this.emailInput.value;
    // let password = this.passwordInput.value;
    let question = {};
    // Validation of Inputs:
    // let errors = {};

    this.props.addQuestion(question);
  }

  render() {
    return (
      <div className="container">
        <h1>Add Question</h1>
        <form onSubmit={this.handleLogin}>
          <div className="inputWrapper" data-error={this.state.errors.email}>
            <input
              type="text"
              aria-label="Question"
              placeholder="Question"
              ref={el => (this.emailInput = el)}
            />
          </div>
          <div className="inputWrapper" data-error={this.state.errors.password}>
            <input
              type="password"
              aria-label="Password"
              placeholder="Password"
              ref={el => (this.passwordInput = el)}
            />
          </div>

          <button className="cta cta-sub" onClick={this.handleAddQuestion}>
            Submit Question
          </button>
        </form>
        {this.isAuthenticated && (
          <button className="cta cta-sub" onClick={this.handleLogout}>
            Logout
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (question) => dispatch(createQuestion(question))
  }
}

export default connect(null, mapDispatchToProps)(AddQuestion);
