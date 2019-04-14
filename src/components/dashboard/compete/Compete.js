import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { toggleSidenav } from "../../../actions/uiActions";
import "./Compete.scss";

class Compete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <main className={this.props.sideNavActive ? "activeSidenav" : null}>
        <div className="container">
          <header>
            <div className="flex_row">
              <div
                className="largeSVGWrapper sidenavTrigger"
                onClick={() => {
                  this.props.dispatch(toggleSidenav());
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  // width="32"
                  // height="32"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              </div>
              <h1>Compete</h1>
            </div>
          </header>
          <hr />
          {/* <h1> Compete</h1> */}
          {/* <p>List of quizes</p> */}
          <section className="quizlist">
            <h2 className="quizlist__header">Upcoming Quiz</h2>
            <div className="quizlist__quiz">
              <div className="flex_row mb-05">
                <div className="quizlist__quiz__title">
                  React-Quiz's Regular
                </div>
                <button className="quizlist__quiz__button register">
                  Register
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
                    {Math.floor(Math.random() * 10) + 3}
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
                <span className="quizlist__quiz__timestamp">
                  Starts in 5 minutes
                </span>
              </div>
            </div>
          </section>

          <section className="quizlist">
            <h2 className="quizlist__header">Finished Quizes</h2>

            <div className="quizlist__quiz">
              <div className="flex_row mb-05">
                <div className="quizlist__quiz__title">
                  React-Quiz's Regular
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
                    {Math.floor(Math.random() * 10) + 3}
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
                <span className="quizlist__quiz__timestamp">
                  10 minutes ago
                </span>
              </div>
            </div>
            <hr />
            <div className="quizlist__quiz">
              <div className="flex_row mb-05">
                <div className="quizlist__quiz__title">
                  React-Quiz's Regular
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
                    {Math.floor(Math.random() * 10) + 3}
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
                <span className="quizlist__quiz__timestamp">
                  10 minutes ago
                </span>
              </div>
            </div>
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
  firestoreConnect(["questions", "quizzes"])
)(Compete);
