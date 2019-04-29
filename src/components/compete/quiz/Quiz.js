import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Markdown from "react-markdown";
import moment from "moment";
import { Route, Redirect } from "react-router-dom";

// Components:
import Spinner from "../../spinner/Spinner";
import BallRipple from "../../spinner/BallRipple";
import Question from "./Question";
import QuizResults from "./QuizResults";
import QuizRegistration from "./QuizRegisteration";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0
      // curQues: null,
      // timerStarted: false,
      // secondsLeft: "XX" // Default render, hide this?
    };
  }

  componentDidMount() {
    // console.warn("Quiz.js Timer started.");
    this.timer = setInterval(() => {
      this.setState(prevState => {
        return { timer: prevState.timer + 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    // console.warn("Quiz.js Timer cleared.");
    clearInterval(this.timer);
    this.setState({ timerStarted: false });
  }

  render() {
    // console.log("Quiz.js Props ", this.props);

    let startTime, endTime, now, isUserRegistered;

    // TODO: Add a check for :quizId, redirect to /compete when quizId doesn't matches.

    // TODO: Add a check for user registration.

    if (this.props.quizDoc) {
      startTime = +moment(this.props.quizDoc.startTime.toDate()).format("X");
      endTime = +moment(this.props.quizDoc.endTime.toDate()).format("X");
      now = +moment().format("X");

      isUserRegistered =
        this.props.quizDoc.registeredUsers.findIndex(
          regUser => regUser.uid === this.props.auth.uid
        ) !== -1;
    }

    return (
      <>
        {this.props.quizDoc &&
        this.props.quizCorrectResponsesALL &&
        this.props.quizIncorrectResponsesALL ? (
          <Route
            exact
            path={this.props.match.url}
            render={props => {
              // console.warn("CHECKING FOR TIME path={this.props.match.url}");
              return startTime < now && now < endTime && isUserRegistered ? (
                  <Redirect
                    to={`/app/compete/${this.props.match.params.quizId}/${
                      this.props.quizDoc.questions[
                        this.props.quizDoc.currentQuestion
                      ]
                    }`}
                  />
              // return startTime < now && now < endTime ? (
              //   isUserRegistered ? (
              //     <Redirect
              //       to={`/app/compete/${this.props.match.params.quizId}/${
              //         this.props.quizDoc.questions[
              //           this.props.quizDoc.currentQuestion
              //         ]
              //       }`}
              //     />
              //   ) : (
              //     <QuizRegistration
              //       quizId={this.props.match.params.quizId}
              //       quizDoc={this.props.quizDoc}
              //       uid={this.props.auth.uid}
              //       sideNavActive={this.props.sideNavActive}
              //       timer={this.state.timer} // Just for setInterval.
              //       startTime={startTime}
              //       endTime={endTime}
              //       now={now}
              //     />
              //   )
              ) : (now <= startTime) || (now < endTime && !isUserRegistered)  ? (
                <QuizRegistration
                  quizId={this.props.match.params.quizId}
                  quizDoc={this.props.quizDoc}
                  uid={this.props.auth.uid}
                  sideNavActive={this.props.sideNavActive}
                  timer={this.state.timer} // Just for setInterval.
                  startTime={startTime}
                  endTime={endTime}
                  now={now}
                />
              ) : (
                <QuizResults
                  quizId={this.props.match.params.quizId}
                  quizDoc={this.props.quizDoc}
                  uid={this.props.auth.uid}
                  sideNavActive={this.props.sideNavActive}
                  timer={this.state.timer} // Just for setInterval.
                  // startTime={startTime}
                  // endTime={endTime}
                  // now={now}
                  quizCorrectResponsesALL={this.props.quizCorrectResponsesALL}
                  quizIncorrectResponsesALL={
                    this.props.quizIncorrectResponsesALL
                  }
                />
              );
            }}
          />
        ) : (
          <main>
            <div className="spinnerContainer">
              <Spinner />
            </div>
          </main>
        )}
        <Route
          exact
          path={`${this.props.match.url}/:questionId`}
          render={props => {
            console.warn(
              "CHECKING FOR TIME path={`${this.props.match.url}/:questionId`}"
            );
            return startTime < now && now < endTime ? (
              <Question
                {...props}
                quizId={this.props.match.params.quizId}
                timer={this.state.timer}
                startTime={startTime}
                // endTime={endTime}
                now={now}
              />
            ) : (
              <Redirect to={`/app/compete/${this.props.match.params.quizId}`} />
            );
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log("REDUX STATE", state);
  // TODO: Populate quiz, maybe do it here then set props.

  return {
    auth: state.firebase.auth,
    quizDoc: state.firestore.data.quizDoc,
    sideNavActive: state.ui.sideNavActive,
    quizCorrectResponsesALL: state.firestore.ordered.quizCorrectResponsesALL,
    quizIncorrectResponsesALL: state.firestore.ordered.quizIncorrectResponsesALL
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "quizzes",
        doc: props.match.params.quizId,
        storeAs: "quizDoc"
      },
      {
        collection: `quizzes/${props.match.params.quizId}/correctResponses`,
        storeAs: "quizCorrectResponsesALL",
        orderBy: ["timestamp", "asc"]
        // where: ["questionId", "==", props.match.params.questionId]
      },
      {
        collection: `quizzes/${props.match.params.quizId}/incorrectResponses`,
        storeAs: "quizIncorrectResponsesALL"
        // where: ["questionId", "==", props.match.params.questionId]
      }
    ];
  })
)(Quiz);
