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
    console.warn("Quiz.js Timer started.");
    this.timer = setInterval(() => {
      this.setState(prevState => {
        return { timer: prevState.timer + 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    console.warn("Quiz.js Timer cleared.");
    clearInterval(this.timer);
    this.setState({ timerStarted: false });
  }

  render() {
    // console.log("Quiz.js Props ", this.props);

    let startTime, endTime, now;

    // TODO: Auto redirect to Questions when quiz starts..
    // If I add a timer here, then page will automatically change between
    // registration, results and quiz.

    if (this.props.quizDoc) {
      startTime = +moment(this.props.quizDoc.startTime.toDate()).format("X");
      endTime = +moment(this.props.quizDoc.endTime.toDate()).format("X");
      now = +moment().format("X");
    }

    return (
      <>
        {this.props.quizDoc ? (
          <Route
            exact
            path={this.props.match.url}
            render={props => {
              console.warn("CHECKING FOR TIME path={this.props.match.url}");
              return startTime < now && now < endTime ? (
                <Redirect
                  to={`/app/compete/${this.props.match.params.quizId}/${
                    this.props.quizDoc.questions[
                      this.props.quizDoc.currentQuestion
                    ]
                  }`}
                />
              ) : now <= startTime ? (
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
    sideNavActive: state.ui.sideNavActive
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
      }
    ];
  })
)(Quiz);
