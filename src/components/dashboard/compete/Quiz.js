import React, { Component } from "react";
import Markdown from "react-markdown";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("Quiz, ", this.props);
    return (
      <main>
        <div className="container">
          <header>
            <div className="flex_row">
              <div className="largeSVGWrapper">
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
              <h1>Quiz</h1>
            </div>
            <div>
              <div className="quizlist__quiz__detail">
                <div className="smallSVGWrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                {Math.floor(Math.random() * 10) + 3}
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
              <div className="quiz-top3__person">AB</div>
            </div>
            <div>
              <div className="quiz-top3__rank">2nd</div>
              <div className="quiz-top3__person">DB</div>
            </div>
            <div>
              <div className="quiz-top3__rank">3rd</div>
              <div className="quiz-top3__person">CSK</div>
            </div>
          </div>
          <hr />
          <div className="quiz-questionNumber">Question 1</div>
          {/* <Markdown source="Test ```js var React = require('react');var Markdown = require('react-markdown');React.render(  <Markdown source='# Your markdown here' />,  document.getElementById('content'));```" /> */}
          <p className="quiz-question">
            What is the output of the following program :
          </p>
          <code className="quiz-code">
            def myfunc(a): a = a + 2 a = a * 2 return a print myfunc(2)
          </code>
          <div className="quiz-options">
            {/* <div>
              <input type="radio" id="test1" name="radio-group" checked />
              <label htmlFor="test1"><div>Apple</div></label>
            </div>
            <div>
              <input type="radio" id="test2" name="radio-group" />
              <label htmlFor="test2"><div>Peach</div></label>
            </div>
            <div>
              <input type="radio" id="test3" name="radio-group" />
              <label htmlFor="test3"><div>Orange</div></label>
            </div> */}
            <ul>
              <li>
                <input type="radio" id="option-one" name="selector" />
                <label htmlFor="option-one">Pizza</label>

                <div className="check" />
              </li>

              <li>
                <input type="radio" id="option-two" name="selector" />
                <label htmlFor="option-two">Bacon</label>

                <div className="check" />
              </li>

              <li>
                <input type="radio" id="option-three" name="selector" />
                <label htmlFor="option-three">Cats</label>

                <div className="check" />
              </li>

              <li>
                <input type="radio" id="option-four" name="selector" />
                <label htmlFor="option-four">
                  This is a long answer, This is a long answer, This is a long
                  answer, This is a long answer, This is a long answer,{" "}
                </label>

                <div className="check" />
              </li>
            </ul>
            {/* <div>
            Making it long <br/>
            Making it long <br/>
            Making it long <br/>
            Making it long <br/>
            Making it long <br/>
            Making it long <br/>
            Making it long <br/>
            Making it long <br/>
            Making it long <br/>
            Making it long <br/>
            Making it long <br/>
            Making it long <br/>
          </div> */}
          </div>
        </div>

        <footer>
          <div className="container">
            <hr />
            <div className="flex_row">
              <button className="primaryButton">SUBMIT 37s</button>
              <div className="flex_row">
                <div className="smallSVGWrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                  </svg>
                </div>
                <span>5</span>
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

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

// conse mapDispatchToProps = disptach => {
//   return {

//   }
// };

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([{ collection: "questions" }])
// )(Quiz);
export default connect(mapStateToProps)(Quiz);
