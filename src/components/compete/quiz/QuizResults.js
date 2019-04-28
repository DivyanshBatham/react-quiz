import React, { Component } from "react";
import { connect } from "react-redux";

// Custom Scrollbar:
// import SimpleBar from "simplebar-react";
import 'simplebar';
import "simplebar/dist/simplebar.min.css";

import moment from "moment";

// Actions:
import { toggleSidenav } from "../../../actions/uiActions";

class QuizResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.tableWrapper = React.createRef();
  }

  getRankNotation = n => {
    let j = n % 10,
      k = n % 100;
    if (j === 1 && k !== 11) {
      return n + "st";
    }
    if (j === 2 && k !== 12) {
      return n + "nd";
    }
    if (j === 3 && k !== 13) {
      return n + "rd";
    }
    return n + "th";
  };

  renderResults = () => {
    let resultMatrix = Array.apply(
      null,
      new Array(this.props.quizDoc.registeredUsers.length)
    ).map(x => {
      return {
        totalScore: 0,
        totalTimetaken: 0,
        responses: new Array(10).fill({})
      };
    });

    let top3Users = [[], [], [], [], [], [], [], [], [], []];

    // Iterating Over Correct Responses:
    for (let i = 0; i < this.props.quizCorrectResponsesALL.length; i++) {
      let res = this.props.quizCorrectResponsesALL[i];

      // Setting User Deatils:
      resultMatrix[res.userIndex].userName = res.userName;
      resultMatrix[res.userIndex].userInitials = res.userInitials;
      resultMatrix[res.userIndex].userId = res.userId;

      // Setting User's Response Deatils:
      let timetaken = +moment(res.timestamp.toDate()).format("s.SSS");
      let score = 0;
      top3Users[res.questionIndex].push(res.userName);
      let rank = top3Users[res.questionIndex].length;
      switch (rank) {
        case 1:
          score = 3;
          break;
        case 2:
          score = 2;
          break;
        case 3:
          score = 1;
          break;
      }

      resultMatrix[res.userIndex].responses[res.questionIndex] = {
        rank: this.getRankNotation(rank),
        score: score,
        timetaken: timetaken
      };
      resultMatrix[res.userIndex].totalScore += score;
      resultMatrix[res.userIndex].totalTimetaken += timetaken;
    }

    // Iterating Over Incorrect Responses:
    this.props.quizIncorrectResponsesALL.forEach(res => {
      let timetaken = +moment(res.timestamp.toDate()).format("s.SSS");
      resultMatrix[res.userIndex].responses[res.questionIndex] = {
        rank: "-",
        score: 0,
        timetaken
      };
    });

    resultMatrix.sort((a, b) => {
      if (a.totalScore !== b.totalScore) return b.totalScore - a.totalScore;
      else if (a.totalTimetaken !== b.totalTimetaken)
        return a.totalTimetaken - b.totalTimetaken;
      else
        return (
          this.props.quizDoc.registeredUsers.findIndex(
            regUser => regUser.uid === a.userId
          ) -
          this.props.quizDoc.registeredUsers.findIndex(
            regUser => regUser.uid === b.userId
          )
        );
    });

    this.setState({
      resultMatrix
    });
  };

  // updateDimensions = () => {
  //   console.log(this.tableWrapper.current.clientWidth);
  //   this.setState({ width: this.tableWrapper.current.clientWidth });
  // };

  componentDidMount() {
    // console.warn("QuizResults.js Props ", this.props);
    // this.updateDimensions();
    this.renderResults();
    // window.addEventListener("resize", this.updateDimensions);
  }

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateDimensions);
  // }

  render() {
    let timestamp = moment(this.props.quizDoc.endTime.toDate()).fromNow(); // a minute ago.

    return (
      <main className={this.props.sideNavActive ? "activeSidenav" : null}>
        <div className="container flex_col">
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
              <h1>Quiz Results</h1>
            </div>
          </header>
          <hr />

          <section className="quizlist">
            {/* TODO: Grammar check: Finished Quiz vs Quiz Finished */}
            <h2 className="quizlist__header">Quiz Finished</h2>
            <div className="quizlist__quiz highlight">
              <div className="flex_row mb-05">
                <div className="quizlist__quiz__title">
                  React-Quiz's Regular ({this.props.quizId})
                </div>
                <button className="quizlist__quiz__button">Finished</button>
              </div>
              <div className="flex_row">
                <div>
                  <div className="quizlist__quiz__detail">
                    <div className="smallSVGWrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                      </svg>
                    </div>
                    {this.props.quizDoc.registeredUsers.length}
                  </div>
                  <div className="quizlist__quiz__detail">
                    <div className="smallSVGWrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path fill="none" d="M0 0h24v24H0V0z" />
                        <path d="M14 1h-4c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1zm-2 13c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1zm7.03-6.61l.75-.75c.38-.38.39-1.01 0-1.4l-.01-.01c-.39-.39-1.01-.38-1.4 0l-.75.75C16.07 4.74 14.12 4 12 4c-4.8 0-8.88 3.96-9 8.76C2.87 17.84 6.94 22 12 22c4.98 0 9-4.03 9-9 0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                      </svg>
                    </div>
                    10 minutes
                  </div>
                </div>
                <span className="quizlist__quiz__timestamp">{timestamp}</span>
              </div>
            </div>
          </section>

          <section className="userlist">
            <h2 className="userlist__heading">Scoreboard</h2>

            <div
              className="userlist-tableWrapper"
              data-simplebar
              data-simplebar-auto-hide="false"
              ref={this.tableWrapper}
            >
              <div>
                <div className="userlist-header">
                  <div className="userlist-row">
                    <div className="userlist-col" style={{ minWidth: "35px" }}>
                      #
                    </div>
                    {/* <div className="userlist-flexcol">Users</div> */}
                    <div
                      className="userlist-flexcol"
                      // className="userlist-col flex-start"
                      // style={{ minWidth: "250px" }}
                    >
                      Users
                    </div>

                    {/* < FOR DESKTOP > */}
                    <div className="userlist-col-group">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(questionIndex => (
                        <div
                          className="userlist-verticalcol"
                          key={questionIndex}
                          style={{ minWidth: "63px" }}
                        >
                          Q{questionIndex}
                        </div>
                      ))}
                    </div>
                    {/* </ FOR DESKTOP > */}

                    <div className="userlist-col" style={{ minWidth: "70px" }}>
                      Score
                    </div>

                    <div className="userlist-col" style={{ minWidth: "83px" }}>
                      Time
                    </div>
                  </div>
                </div>
                <hr className="noMargin" style={{ width: this.state.width }}/>

                {this.state.resultMatrix &&
                  this.state.resultMatrix.map((regUser, userIndex) => {
                    return (
                      <div key={regUser.userId}>
                        <div
                          className={
                            regUser.userId === this.props.uid
                              ? "userlist-row active"
                              : "userlist-row"
                          }
                        >
                          {/* TODO: 
                              - Add an empty div of 100% to userlist-row and width from state, z-index:-1 
                              - Remove background from userlist-row
                        */}
                          {/* {regUser.userId === this.props.uid && (
                            <div
                              className="userlist-bg"
                              style={{ width: this.state.width }}
                            >
                            &nbsp;
                            </div>
                          )} */}
                          <div
                            className="userlist-col"
                            style={{ minWidth: "35px" }}
                          >
                            {userIndex + 1}
                          </div>
                          {/* <div className="userlist-flexcol"> */}
                          <div
                            className="userlist-flexcol"
                            // className="userlist-col flex-start"
                            // style={{ minWidth: "250px" }}
                          >
                            <div
                              className={
                                regUser.userId === this.props.uid
                                  ? "userlist-userIcon active"
                                  : "userlist-userIcon"
                              }
                            >
                              {regUser.userInitials}
                            </div>

                            <div className="userlist-userName">
                              {regUser.userName}
                            </div>
                          </div>
                          {/* < FOR DESKTOP > */}
                          <div className="userlist-col-group">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                              questionIndex => (
                                <div
                                  className="userlist-verticalcol"
                                  style={{ minWidth: "63px" }}
                                  key={questionIndex}
                                >
                                  {this.state.resultMatrix[userIndex] &&
                                  this.state.resultMatrix[userIndex].responses[
                                    questionIndex
                                  ].timetaken ? (
                                    <>
                                      <span className="userlist-verticalcol__score">
                                        {
                                          // Score:
                                          // this.state.resultMatrix[userIndex].responses[
                                          //   questionIndex
                                          // ].score

                                          // Rank:
                                          this.state.resultMatrix[userIndex]
                                            .responses[questionIndex].rank
                                        }
                                      </span>
                                      <span className="userlist-verticalcol__timestamp">
                                        {
                                          this.state.resultMatrix[userIndex]
                                            .responses[questionIndex].timetaken
                                        }
                                      </span>
                                    </>
                                  ) : (
                                    <>-</>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                          {/* </ FOR DESKTOP > */}

                          <div
                            className="userlist-col"
                            style={{ minWidth: "70px" }}
                          >
                            {this.state.resultMatrix[userIndex].totalScore}
                          </div>
                          <div
                            className="userlist-col"
                            style={{ minWidth: "83px" }}
                          >
                            {this.state.resultMatrix[
                              userIndex
                            ].totalTimetaken.toFixed(3) + "s"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <hr className="noMargin" style={{ width: this.state.width }}/>
                {/* <hr /> */}
              </div>
            </div>
            {/* TableWrapper */}
          </section>
        </div>
      </main>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   console.log("REDUX STATE", state);
//   // TODO: Populate quiz, maybe do it here then set props.

//   return {
//     // auth: state.firebase.auth,
//     // quizDoc: state.firestore.data.quizDoc,
//     // sideNavActive: state.ui.sideNavActive,
//     quizCorrectResponses: state.firestore.ordered.quizCorrectResponses,
//     quizIncorrectResponses: state.firestore.ordered.quizIncorrectResponses
//   };
// };

export default connect()(QuizResults);
