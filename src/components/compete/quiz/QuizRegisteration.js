import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

// Actions:
import { registerForQuiz } from "../../../actions/quizActions";
import { toggleSidenav } from "../../../actions/uiActions";

class QuizRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props);

    let startTime = this.props.startTime;
    let endTime = this.props.endTime;
    let now = this.props.now;

    let isUserRegistered =
      this.props.quizDoc.registeredUsers.findIndex(
        registeredUser => registeredUser.uid === this.props.uid
      ) !== -1;

    let status, timestamp;

    if (now < startTime) {
      status = "Upcoming";
      timestamp =
        "Starts " + moment(this.props.quizDoc.startTime.toDate()).fromNow(); // Make this return "Starts in x minutes.."
    } else if (now < endTime) {
      status = "Running";
      timestamp =
        Math.abs(
          moment().diff(moment(this.props.quizDoc.endTime.toDate()), "minutes")
        ) +
        1 +
        " minutes remaining";
    } else {
      status = "Finished";
      timestamp = moment(this.props.quizDoc.endTime.toDate()).fromNow(); // a minute ago.
    }

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
              <h1>Quiz Registration</h1>
            </div>
            {/* <div>
              <div className="quizlist__quiz__detail">
                <div className="smallSVGWrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                {this.props.quizDoc.registeredUsers.length}
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
            </div> */}
          </header>
          <hr />

          <section className="quizlist">
            <h2 className="quizlist__header">Upcoming Quiz</h2>
            <div className="quizlist__quiz highlight">
              <div className="flex_row mb-05">
                <div className="quizlist__quiz__title">
                  React-Quiz's Regular ({this.props.quizId})
                </div>
                {/* <button className="quizlist__quiz__button">{status}</button> */}
                <button
                  className="quizlist__quiz__button register"
                  // TODO: Check inclues( )
                  disabled={isUserRegistered}
                  onClick={() =>
                    this.props.dispatch(registerForQuiz(this.props.quizId))
                  }
                >
                  {isUserRegistered ? "Registered" : "Register"}
                </button>
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
            <h2 className="userlist__heading">Registered Users</h2>

            <div className="userlist-header">
              <div className="userlist-row">
                <div className="userlist-col" style={{ minWidth: "35px" }}>
                  #
                </div>
                <div className="userlist-flexcol">Users</div>
                <div className="userlist-col" style={{ minWidth: "60px" }}>
                  Score
                </div>
              </div>
            </div>
            <hr />

            {/* TODO: Proper Hightlighting of current User */}
            {this.props.quizDoc.registeredUsers.length > 0 ? (
              this.props.quizDoc.registeredUsers.map((regUser, index) => {
                return (
                  <div key={regUser.uid}>
                    <div
                      className={
                        regUser.uid === this.props.uid
                          ? "userlist-row active"
                          : "userlist-row"
                      }
                    >
                      <div
                        className="userlist-col"
                        style={{ minWidth: "35px" }}
                      >
                        {index + 1}
                      </div>
                      <div className="userlist-flexcol">
                        <div
                          className={
                            regUser.uid === this.props.uid
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
                      <div
                        className="userlist-col"
                        style={{ minWidth: "60px" }}
                      >
                        - - -
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })
            ) : (
              <>
                {/* <p>{"No one has registered yet :("}</p> */}
                <p className="userlist-emptyMessage">
                  Become the first one to register.
                </p>
                <hr />
              </>
            )}
          </section>
        </div>
      </main>
    );
  }
}

// mapStateToProps = state => {
//     return {
//         // quizDoc
//     }
// }

export default connect()(QuizRegistration);
