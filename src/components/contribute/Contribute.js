import React, { Component } from "react";
import { connect } from "react-redux";

// Actions:
import { createQuestion } from "../../actions/questionActions";
import { toggleSidenav } from "../../actions/uiActions";

class Contribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  handleAddQuestion = event => {
    event.preventDefault();

    let question = this.questionInput.value;
    let optionOne = this.optionOneInput.value;
    let optionTwo = this.optionTwoInput.value;
    let optionThree = this.optionThreeInput.value;
    let optionFour = this.optionFourInput.value;
    let correctOption = this.correctOptionInput.value;

    // console.log
    let questionData = {
      question,
      optionOne,
      optionTwo,
      optionThree,
      optionFour,
      correctOption
    };
//$$$ console.log(questionData);

    // Validation of Inputs:
    let errors = {};

    if (question === "") errors.question = "* question is required";
    if (optionOne === "") errors.optionOne = "* option one is required";
    if (optionTwo === "") errors.optionTwo = "* option two is required";
    if (optionThree === "") errors.optionThree = "* option three is required";
    if (optionFour === "") errors.optionFour = "* option four is required";
    if (correctOption === "")
      errors.correctOption = "* correct option is required";
    // TODO: Uncomment this after debugging:
    // else if (!emailRegex.test(email)) errors.email = "* email is invalid";

    if (Object.entries(errors).length === 0 && errors.constructor === Object) {
      this.props.addQuestion(questionData);
      alert("Question Submitted");
      this.resetForm();

      // this.props.signIn({ email, password });
      // this.setState({ redirectToReferrer: true });
    } else {
      this.setState({
        errors
      });
    }
  };

  resetForm = () => {
    this.questionInput.value = "";
    this.optionOneInput.value = "";
    this.optionTwoInput.value = "";
    this.optionThreeInput.value = "";
    this.optionFourInput.value = "";
    this.correctOptionInput.value = "";
    this.setState({
      errors: {}
    });
  };

  render() {
    return (
      <main className={this.props.sideNavActive ? "activeSidenav" : null}>
        <div className="container">
          <header>
            <div className="flex_row">
              <div
                className="largeSVGWrapper"
                onClick={this.props.toggleSidenav}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              </div>
              <h1>Add Question</h1>
            </div>
          </header>
          <hr />

          <form onSubmit={this.handleAddQuestion} className="questionForm">
            <div
              className="inputWrapper"
              data-error={this.state.errors.question}
            >
              <label htmlFor="question">Question</label>
              <textarea
                className="question"
                id="question"
                placeholder="Enter question (markdown supported)"
                ref={el => (this.questionInput = el)}
              />
            </div>

            <div
              className="inputWrapper"
              data-error={this.state.errors.optionOne}
            >
              <label htmlFor="option-one">Option 1</label>
              <textarea
                className="options"
                id="option-one"
                placeholder="Enter option 1 (markdown supported)"
                ref={el => (this.optionOneInput = el)}
              />
            </div>
            <div
              className="inputWrapper"
              data-error={this.state.errors.optionTwo}
            >
              <label htmlFor="option-two">Option 2</label>
              <textarea
                className="options"
                id="option-two"
                placeholder="Enter option 2 (markdown supported)"
                ref={el => (this.optionTwoInput = el)}
              />
            </div>
            <div
              className="inputWrapper"
              data-error={this.state.errors.optionThree}
            >
              <label htmlFor="option-three">Option 3</label>
              <textarea
                className="options"
                id="option-three"
                placeholder="Enter option 3 (markdown supported)"
                ref={el => (this.optionThreeInput = el)}
              />
            </div>
            <div
              className="inputWrapper"
              data-error={this.state.errors.optionFour}
            >
              <label htmlFor="option-four">Option 4</label>
              <textarea
                className="options"
                id="option-four"
                placeholder="Enter option 4 (markdown supported)"
                ref={el => (this.optionFourInput = el)}
              />
            </div>

            <div
              className="inputWrapper"
              data-error={this.state.errors.correctOption}
            >
              <label htmlFor="correct-option">Correct Option</label>
              <input
                className="options"
                type="text"
                id="correct-option"
                placeholder="Enter correct option number (1-4)"
                ref={el => (this.correctOptionInput = el)}
              />
            </div>
            <br />
            <div className="primaryButton" onClick={this.handleAddQuestion}>
              Submit Question
            </div>
          </form>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    sideNavActive: state.ui.sideNavActive
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addQuestion: question => dispatch(createQuestion(question)),
    toggleSidenav: () => dispatch(toggleSidenav())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contribute);
