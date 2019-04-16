import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, populate } from "react-redux-firebase";
import Markdown from "react-markdown";

// Components:
import Spinner from "../../spinner/Spinner";
import BallRipple from "../../spinner/BallRipple";
import Question from "../../Question";

// Actions:
import { toggleSidenav } from "../../../actions/uiActions";

// import { likeQuestion } from "../../actions/questionActions";
// import { dislikeQuestion } from "../../actions/questionActions";

const populates = [
  { child: "owner", root: "users" } // replace owner with user object
];

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curQues: null,
      secondsLeft: 60
    };
  }

  componentDidMount() {
    // const quiz = this.props.quiz;
    // const questions = this.props.questions;
    //
    // this.timer = setInterval(() => {
    //   this.setState(prevState => {
    //     if (this.props.quiz) {
    //       if (this.state.secondsLeft === 1) {
    //         clearInterval(this.timer);
    //         alert("Server will change currentQuestion");
    //       }
    //       // if( this.props.curQues === null ){
    //       //   // Calculate secondsLeft
    //       //   alert("Calculate seconds left");
    //       //   this.setState({
    //       //     secondsLeft: 30
    //       //   })
    //       // }
    //       // else if (this.state.curQues == quiz.currentQuestion)
    //       if (this.state.curQues == this.props.quiz.currentQuestion)
    //         return {
    //           secondsLeft: prevState.secondsLeft - 1
    //           // curQues: (prevState.curQues+1)%questions.length
    //         };
    //       else
    //         return {
    //           curQues: this.props.quiz.currentQuestion,
    //           secondsLeft: 60
    //         };
    //     }
    //   });
    // }, 1000);
  }

  render() {
    console.log("Quiz.js Props ", this.props);
    const quiz = this.props.quiz;
    const questions = this.props.questions;

    return (
      <main className={this.props.sideNavActive ? "activeSidenav" : null}>
        <div className="container">
          <header>
            <div className="flex_row">
              <div
                className="largeSVGWrapper"
                onClick={() => {
                  this.props.dispatch(toggleSidenav());
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              </div>
              <h1>Quiz {this.props.match.params.id}</h1>
            </div>
            <div>
              <div className="quizlist__quiz__detail">
                <div className="smallSVGWrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                {quiz ? quiz.registeredUsers.length : 0}
                {/* {Math.floor(Math.random() * 10) + 3} */}
              </div>
              <div className="quizlist__quiz__detail">
                <div className="smallSVGWrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M14 1h-4c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1zm-2 13c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1zm7.03-6.61l.75-.75c.38-.38.39-1.01 0-1.4l-.01-.01c-.39-.39-1.01-.38-1.4 0l-.75.75C16.07 4.74 14.12 4 12 4c-4.8 0-8.88 3.96-9 8.76C2.87 17.84 6.94 22 12 22c4.98 0 9-4.03 9-9 0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                  </svg>
                </div>
                10 minutes
              </div>
            </div>
          </header>
          <hr />
          <div className="quiz-top3">
            <div>
              <div className="quiz-top3__rank">1st</div>
              <BallRipple />
              {/* <div className="quiz-top3__person">AB</div> */}
            </div>
            <div>
              <div className="quiz-top3__rank">2nd</div>
              <BallRipple />
              {/* <div className="quiz-top3__person"></div> */}
            </div>
            <div>
              <div className="quiz-top3__rank">3rd</div>
              <BallRipple />
              {/* <div className="quiz-top3__person"></div> */}
            </div>
          </div>
          <hr />
          {/* <div className="quiz-questionNumber">Question {quiz.currentQuestion+1}</div> */}
          {questions && quiz ? (
            <>
              {/* <Question /> */}
              <div className="quiz-questionNumber">
                Question {quiz.currentQuestion + 1}
              </div>
              <Markdown
                source={
                  // THIS IS COMPLETELY
                  questions.find(
                    question =>
                      question.id === quiz.questions[quiz.currentQuestion].id
                  ).question
                }
              />
              <div className="quiz-options">
                <ul>
                  <li>
                    <input type="radio" id="option-one" name="selector" />
                    <label htmlFor="option-one">
                      {
                        questions.find(
                          question =>
                            question.id ===
                            quiz.questions[quiz.currentQuestion].id
                        ).options[0]
                      }
                    </label>

                    <div className="check" />
                  </li>

                  <li>
                    <input type="radio" id="option-two" name="selector" />
                    <label htmlFor="option-two">
                      {
                        questions.find(
                          question =>
                            question.id ===
                            quiz.questions[quiz.currentQuestion].id
                        ).options[1]
                      }
                    </label>

                    <div className="check" />
                  </li>

                  <li>
                    <input type="radio" id="option-three" name="selector" />
                    <label htmlFor="option-three">
                      {
                        questions.find(
                          question =>
                            question.id ===
                            quiz.questions[quiz.currentQuestion].id
                        ).options[2]
                      }
                    </label>

                    <div className="check" />
                  </li>

                  <li>
                    <input type="radio" id="option-four" name="selector" />
                    <label htmlFor="option-four">
                      {
                        questions.find(
                          question =>
                            question.id ===
                            quiz.questions[quiz.currentQuestion].id
                        ).options[3]
                      }
                    </label>

                    <div className="check" />
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </div>

        <footer>
          <div className="container">
            <hr />
            <div className="flex_row">
              <button className="primaryButton">
                SUBMIT {this.state.secondsLeft}s
              </button>
              <div className="flex_row">
                <div
                  className="smallSVGWrapper"
                  // onClick={ () => this.props.likeQuestion("quesData")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                  </svg>
                </div>
                <span>5 </span>
                {/* <span> { quiz ? quiz.questions.find( question => question.id === quiz.questions[quiz.currentQuestion].id ) } </span> */}
                <div className="smallSVGWrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                  </svg>
                </div>
                <span>2</span>
                <div className="smallSVGWrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("REDUX STATE", state);
  // TODO: Populate quiz, maybe do it here then set props.

  return {
    questions: state.firestore.ordered.questions,
    quiz: state.firestore.data.quiz,
    sideNavActive: state.ui.sideNavActive
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     toggleSidenav: () => dispatch(toggleSidenav())
//     // likeQuestion: qData => dispatch(likeQuestion(qData))
//     // // dislikeQuestion: qData => dispatch(dislikeQuestion(qData))
//   };
// };

export default compose(
  connect(
    mapStateToProps
    // mapDispatchToProps,
  ),
  firestoreConnect(props => {
    // console.log("firestoreConnect props, ", props);
    return [
      { collection: "quizzes", doc: props.match.params.id, storeAs: "quiz" },
      { collection: "questions" }
    ];
  })
)(Quiz);
