import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";

// Actions:
import { toggleSidenav } from "../../actions/uiActions";
import "./Compete.scss";

// Components:
import QuizItem from "./quiz/QuizItem";
import Spinner from "../spinner/Spinner";

class Compete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.warn("Compete.js Timer started.");
    this.timer = setInterval(() => {
      this.setState({ timer: "timer" });
    }, 1000);
  }

  componentWillUnmount() {
    console.warn("Compete.js Timer cleared.");
    clearInterval(this.timer);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.props, nextProps);
  // }

  render() {
    // console.log("Compete.js");
    let now = +moment().format("X");

    // if (this.props.quizDoc) {
    //   startTime = +moment(this.props.quizDoc.startTime.toDate()).format("X");
    //   endTime = +moment(this.props.quizDoc.endTime.toDate()).format("X");
    // }

    return (
      <main className={this.props.sideNavActive ? "activeSidenav" : null}>
        <div className="container flex_col">
          <header>
            <div className="flex_row">
              <div
                className="largeSVGWrapper sidenavTrigger"
                onClick={() => {
                  this.props.dispatch(toggleSidenav());
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              </div>
              <h1>Compete</h1>
            </div>
          </header>
          <hr />

          <section className="quizlist">
            <h2 className="quizlist__header">Upcoming Quiz</h2>
            {this.props.quizzes ? (
              this.props.quizzes
                .filter(
                  quiz => now < +moment(quiz.endTime.toDate()).format("X")
                )
                .map(quiz => <QuizItem quiz={quiz} key={quiz.id} />)
            ) : (
              // <div className="spinnerContainer">
              <Spinner />
              // </div>
            )}
          </section>

          <section className="quizlist flex_col">
            <h2 className="quizlist__header">Finished Quizes</h2>
            {/* <div className="row"> */}
            {/* <div className="col-8 offset-2"> */}
            {this.props.quizzes ? (
              this.props.quizzes
                .filter(
                  quiz => now >= +moment(quiz.endTime.toDate()).format("X")
                )
                .map(quiz => <QuizItem quiz={quiz} key={quiz.id} />)
            ) : (
              <div className="spinnerContainer">
                <Spinner />
              </div>
            )}
            {/* </div> */}
            {/* </div> */}
          </section>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    quizzes: state.firestore.ordered.quizzes,
    sideNavActive: state.ui.sideNavActive
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "quizzes",
      orderBy: ["startTime", "desc"]
      // where: ["questionId", "==", props.match.params.questionId]
    }
  ])

  // firestoreConnect([{ collection: "quizzes", limit: 10 }]) // This will get only 3 quizzes
  // firestoreConnect([{ collection: "quizzes", orderBy: ['timestamp', 'desc'] }]) // This will work
)(Compete);
