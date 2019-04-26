import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Markdown from "react-markdown";
import moment from "moment";

// Components:
import Spinner from "../../spinner/Spinner";
import BallRipple from "../../spinner/BallRipple";

// Actions:
import { toggleSidenav } from "../../../actions/uiActions";
import { fetchQuestion } from "../../../actions/questionActions";
import { submitAnswer } from "../../../actions/questionActions";
import { likeQuestion } from "../../../actions/questionActions";
import { dislikeQuestion } from "../../../actions/questionActions";
import QuizResults from "./QuizResults";
import QuizRegistration from "./QuizRegisteration";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { secondsLeft: 60 };
  }

  // componentWillReceiveProps() {
  //   console.warn("componentWillReceiveProps");
  // }

  componentDidMount() {
    console.warn("FETCH_QUESTION ", this.props.match.params.questionId);
    // this.timer = setInterval(() => {
    //   console.log("Timer");
    // }, 1000);
    // console.warn(
    //   "FETCH_QUESTION Number %s",
    //   this.props.quizDoc.currentQuestion
    // );
    // this.props.fetchQuestion(this.props.quizId);

    console.warn("Quiz.js Timer started.");
    // const quiz = this.props.quiz;
    // const questions = this.props.questions;
    //
    // this.timer = setInterval(() => {
    //   this.setState(prevState => {
    //     // return {
    //     //   secondsLeft: prevState.secondsLeft - 1
    //     // };

    //     if (this.props.quizDoc) {
    //       if (this.state.secondsLeft === 1) {
    //         console.warn("Server will change currentQuestion.");
    //         // clearInterval(this.timer);
    //         // alert("Server will change currentQuestion");
    //         // return {
    //         //   curQues: (prevState.curQues+1)%this.props.quiz.questions.length,
    //         //   secondsLeft: 60
    //         // };
    //       }
    //       // if( this.props.curQues === null ){
    //       //   // Calculate secondsLeft
    //       //   alert("Calculate seconds left");
    //       //   this.setState({
    //       //     secondsLeft: 30
    //       //   })
    //       // }
    //       // else if (this.state.curQues == quiz.currentQuestion)
    //       if (this.state.curQues === this.props.quizDoc.currentQuestion) {
    //         // console.log(moment(this.props.quizDoc.startTime.toDate()).seconds());
    //         console.log(
    //           "Difference from startTime ",
    //           moment(this.props.quizDoc.startTime.toDate()).diff(
    //             new Date(),
    //             "seconds"
    //           )
    //         );
    //         console.log(
    //           moment(this.props.quizDoc.startTime.toDate())
    //             .add(this.props.quizDoc.currentQuestion, "minutes")
    //             .diff(new Date(), "seconds")
    //         );
    //         return {
    //           secondsLeft: prevState.secondsLeft - 1
    //           // curQues: (prevState.curQues+1)%questions.length
    //         };
    //       } else {
    //         // When server changes quiz.currentQuestion
    //         console.warn(
    //           "FETCH_QUESTION Number %s",
    //           this.props.quizDoc.currentQuestion
    //         );
    //         // this.props.fetchQuestion(
    //         //   this.props.quizDoc.questions[this.props.quizDoc.currentQuestion]
    //         // );
    //         return {
    //           curQues: this.props.quizDoc.currentQuestion,
    //           secondsLeft: moment(this.props.quizDoc.startTime.toDate())
    //             // .add(this.props.quizDoc.currentQuestion, "minutes")
    //             .diff(new Date(), "seconds"),
    //           // secondsLeft: moment.duration(moment(this.props.quizDoc.startTime.toDate()).diff(new Date())).asSeconds(),
    //           // secondsLeft: 60,
    //           timerStarted: true,
    //           selectedOption: null
    //         };
    //       }
    //     }
    //   });
    // }, 1000);
  }

  componentWillUnmount() {
    console.warn("Quiz.js Timer cleared.");
    // TODO: IF this component is unmounted when going to results or any other page, then add logic for userIndex in componentWIllMount
    clearInterval(this.timer);
    this.setState({ timerStarted: false });
  }

  handleOptionChange = changeEvent => {
    // console.log(changeEvent, changeEvent.target.value);
    console.warn("Choosen Option ", changeEvent.target.value);
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  handleSubmitAnswer = () => {

    console.log(this.state.selectedOption);
    if (this.state.selectedOption)
      this.props.submitAnswer(
        this.props.quizId,
        this.props.match.params.questionId,
        this.props.questionDoc,
        this.state.selectedOption,
    // questionIndex:
        this.props.quizDoc.currentQuestion,
    // userIndex:
        this.props.quizDoc.registeredUsers.findIndex(regUser => regUser.uid === this.props.auth.uid)
        );
    else alert("Select Atleast on option");
  };

  render() {
    // console.log("Question.js Props ", this.props);

    const quizDoc = this.props.quizDoc;
    const questionDoc = this.props.questionDoc;
    const quizCorrectResponses = this.props.quizCorrectResponses;
    const quizIncorrectResponses = this.props.quizIncorrectResponses;

    // +moment(this.props.quizDoc.startTime.toDate()).format("X");
    // let quizStart = +moment(quizDoc.startTime.toDate()).format("X");

    // let quizStart = this.props.startTime;
    // let questionEnd = quizStart + 60 * (quizDoc.currentQuestion + 1);
    // let secondsLeft = questionEnd - +moment(new Date()).format("X");

    let currentQuestionEndTime =
      this.props.startTime + 60 * (quizDoc.currentQuestion + 1);
    let secondsLeft = currentQuestionEndTime - this.props.now;

    // console.log("quizStart: ", quizStart);
    // console.log("questionEnd: ", questionEnd);
    // console.log("SECONDS LEFT: ", secondsLeft);

    // TODO: Reset selectedOption for new Question

    // if (secondsLeft === 60)
    //   this.setState(prevState => {
    //     console.log("UPDATE");
    //     return { selectedOption: null };
    //   });

    // If :/questionId doesn't matches, redirect to currentQuestion Id:
    if (
      this.props.quizDoc &&
      this.props.match.params.questionId !==
        this.props.quizDoc.questions[this.props.quizDoc.currentQuestion]
    )
      return (
        <Redirect
          to={`/app/compete/${this.props.quizId}/${
            this.props.quizDoc.questions[this.props.quizDoc.currentQuestion]
          }`}
        />
      );

    return (
      <main className={this.props.sideNavActive ? "activeSidenav" : null}>
        <div className="container flex_col">
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
              <h1>Quiz</h1>
              {/* <h1>Quiz {this.props.match.params.id}</h1> */}
            </div>
            <div>
              <div className="quizlist__quiz__detail">
                <div className="smallSVGWrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                {quizDoc ? quizDoc.registeredUsers.length : 0}
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

          {this.props.quizDoc && this.props.questionDoc ? (
            <>
              <div className="quiz-top3">
                <div className="flex_col">
                  <div className="quiz-top3__rank">1st</div>
                  {quizCorrectResponses &&
                  quizCorrectResponses[0] &&
                  quizCorrectResponses[0].timestamp ? (
                    <>
                      <div
                        className={
                          quizCorrectResponses[0].userId === this.props.auth.uid
                            ? "quiz-top3__person active"
                            : "quiz-top3__person"
                        }
                      >
                        {quizCorrectResponses[0].userInitials}
                      </div>
                      <div className="quiz-top3__rank">
                        {/* {moment(
                          quizCorrectResponses[0].timestamp.toDate()
                        ).format("x")} */}
                        {moment(
                          quizCorrectResponses[0].timestamp.toDate()
                        ).format("s.SSS") + "s"}
                      </div>
                    </>
                  ) : (
                    <>
                      <BallRipple />
                      <div className="quiz-top3__rank">- - -</div>
                    </>
                  )}
                </div>
                <div className="flex_col">
                  <div className="quiz-top3__rank">2nd</div>
                  {quizCorrectResponses &&
                  quizCorrectResponses[1] &&
                  quizCorrectResponses[1].timestamp ? (
                    <>
                      <div
                        className={
                          quizCorrectResponses[1].userId === this.props.auth.uid
                            ? "quiz-top3__person active"
                            : "quiz-top3__person"
                        }
                      >
                        {quizCorrectResponses[1].userInitials}
                      </div>
                      <div className="quiz-top3__rank">
                        {/* {moment(
                          quizCorrectResponses[1].timestamp.toDate()
                        ).format("x")} */}
                        {moment(
                          quizCorrectResponses[1].timestamp.toDate()
                        ).format("s.SSS") + "s"}
                      </div>
                    </>
                  ) : (
                    <>
                      <BallRipple />
                      <div className="quiz-top3__rank">- - -</div>
                    </>
                  )}
                </div>
                <div className="flex_col">
                  <div className="quiz-top3__rank">3rd</div>
                  {quizCorrectResponses &&
                  quizCorrectResponses[2] &&
                  quizCorrectResponses[2].timestamp ? (
                    <>
                      <div
                        className={
                          quizCorrectResponses[2].userId === this.props.auth.uid
                            ? "quiz-top3__person active"
                            : "quiz-top3__person"
                        }
                      >
                        {quizCorrectResponses[2].userInitials}
                      </div>
                      <div className="quiz-top3__rank">
                        {/* {moment(
                          quizCorrectResponses[2].timestamp.toDate()
                        ).format("x")} */}
                        {moment(
                          quizCorrectResponses[0].timestamp.toDate()
                        ).format("s.SSS") + "s"}
                      </div>
                    </>
                  ) : (
                    <>
                      <BallRipple />
                      <div className="quiz-top3__rank">- - -</div>
                    </>
                  )}
                </div>
              </div>
              <hr />
              <div className="questionContainer">
                <div className="quiz-questionNumber">
                  Question {quizDoc.currentQuestion + 1}
                </div>
                <Markdown source={questionDoc.question} />
                <div className="quiz-options">
                  <ul>
                    <li>
                      <input
                        type="radio"
                        id="option-one"
                        name="userResponse"
                        value="1"
                        checked={this.state.selectedOption === "1"}
                        onChange={this.handleOptionChange}
                      />
                      <label htmlFor="option-one">
                        {questionDoc.options[0]}
                      </label>

                      <div className="check" />
                    </li>

                    <li>
                      <input
                        type="radio"
                        id="option-two"
                        name="userResponse"
                        value="2"
                        checked={this.state.selectedOption === "2"}
                        onChange={this.handleOptionChange}
                      />
                      <label htmlFor="option-two">
                        {questionDoc.options[1]}
                      </label>

                      <div className="check" />
                    </li>

                    <li>
                      <input
                        type="radio"
                        id="option-three"
                        name="userResponse"
                        value="3"
                        checked={this.state.selectedOption === "3"}
                        onChange={this.handleOptionChange}
                      />
                      <label htmlFor="option-three">
                        {questionDoc.options[2]}
                      </label>

                      <div className="check" />
                    </li>

                    <li>
                      <input
                        type="radio"
                        id="option-four"
                        name="userResponse"
                        value="4"
                        checked={this.state.selectedOption === "4"}
                        onChange={this.handleOptionChange}
                      />
                      <label htmlFor="option-four">
                        {questionDoc.options[3]}
                      </label>

                      <div className="check" />
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="spinnerContainer">
              <Spinner />
            </div>
          )}
        </div>

        {this.props.quizDoc && this.props.questionDoc && (
          <footer>
            <div className="container">
              <hr />
              <div className="flex_row">
                <button
                  className="primaryButton"
                  onClick={this.handleSubmitAnswer}
                  disabled={
                    secondsLeft <= 0 ||
                    (quizCorrectResponses &&
                      quizIncorrectResponses &&
                      (quizCorrectResponses.find(
                        response => response.userId === this.props.auth.uid
                      ) ||
                        quizIncorrectResponses.find(
                          response => response.userId === this.props.auth.uid
                        )))
                  }
                >
                  {quizCorrectResponses &&
                  quizIncorrectResponses &&
                  (quizCorrectResponses.find(
                    response => response.userId === this.props.auth.uid
                  ) ||
                    quizIncorrectResponses.find(
                      response => response.userId === this.props.auth.uid
                    ))
                    ? "SUBMITTED " + secondsLeft + "s"
                    : "SUBMIT " + secondsLeft + "s"}
                  {/* SUBMIT {this.state.secondsLeft}s */}

                  {/* TODO: maybe add a tooltip for subsequest submits, and keep SUBMIT Xs format */}
                </button>
                {/* {!this.props.questionIsFetching && this.state.timerStarted && ( */}
                {/* {this.props.quizDoc && this.props.questionDoc && ( */}
                <div className="flex_row">
                  <div
                    className={
                      questionDoc.likes.includes(this.props.auth.uid)
                        ? "svgWrapper active"
                        : "svgWrapper"
                    }
                    onClick={() =>
                      this.props.likeQuestion(
                        questionDoc,
                        this.props.match.params.questionId
                        // quizDoc.questions[this.state.curQues]
                      )
                    }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="none" d="M0 0h24v24H0V0z" />
                      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                    </svg>
                  </div>
                  <span>{questionDoc.likes.length}</span>
                  <div
                    className={
                      questionDoc.dislikes.includes(this.props.auth.uid)
                        ? "svgWrapper active"
                        : "svgWrapper"
                    }
                    onClick={() =>
                      this.props.dislikeQuestion(
                        questionDoc,
                        this.props.match.params.questionId
                        // quizDoc.questions[this.state.curQues]
                      )
                    }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                    </svg>
                  </div>
                  <span>{questionDoc.dislikes.length}</span>
                  <div className="svgWrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      </main>
    );
    // : (
    //   <Redirect
    //     to={`/app/compete/${this.props.quizId}/${
    //       this.props.quizDoc.questions[this.props.quizDoc.currentQuestion].id
    //     }`}
    //   />
    // )
    // ) : (
    //   <div className="spinnerContainer">
    //     <Spinner />
    //   </div>
    // );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log("REDUX STATE", state);
  // TODO: Populate quiz, maybe do it here then set props.

  return {
    auth: state.firebase.auth,
    quizDoc: state.firestore.data.quizDoc,
    questionDoc: state.firestore.data.questionDoc,
    quizCorrectResponses: state.firestore.ordered.quizCorrectResponses,
    quizIncorrectResponses: state.firestore.ordered.quizIncorrectResponses,
    questionIsFetching: state.question.isFetching,
    sideNavActive: state.ui.sideNavActive
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSidenav: () => dispatch(toggleSidenav()),
    submitAnswer: (
      quizId,
      questionId,
      qDoc,
      option,
      questionIndex,
      userIndex
    ) =>
      dispatch(
        submitAnswer(quizId, questionId, qDoc, option, questionIndex, userIndex)
      ),
    likeQuestion: (qDoc, questionId) =>
      dispatch(likeQuestion(qDoc, questionId)),
    dislikeQuestion: (qDoc, questionId) =>
      dispatch(dislikeQuestion(qDoc, questionId)),
    fetchQuestion: ref => dispatch(fetchQuestion(ref))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    // console.log("firestoreConnect props, ", props);
    // this.props.quizDoc.questions[this.props.quizDoc.currentQuestion].id
    // quizzes/:quizId/responses/:questionId/(correctResponses|incorrectResponses)
    return [
      { collection: "quizzes", doc: props.quizId, storeAs: "quizDoc" },
      {
        collection: "questions",
        doc: props.match.params.questionId,
        storeAs: "questionDoc"
      },
      {
        collection: `quizzes/${props.quizId}/correctResponses`,
        storeAs: "quizCorrectResponses",
        orderBy: ["timestamp", "asc"],
        where: ["questionId", "==", props.match.params.questionId]
        // limit: 3
      },
      {
        collection: `quizzes/${props.quizId}/incorrectResponses`,
        storeAs: "quizIncorrectResponses",
        where: ["questionId", "==", props.match.params.questionId]
      }
    ];

    // TODO: MOVE THESE TO Quiz.js
  })
)(Question);
