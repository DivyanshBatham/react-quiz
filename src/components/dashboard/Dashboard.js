import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Sidenav from "./Sidenav";
import Home from "./home/home";
import AddQuestion from "./question/AddQuestion";
import Compete from "./compete/Compete";
import Quiz from "./compete/Quiz";

// const Compete = props => {
//   console.log("Compete ", props);
//   return <h1>Compete</h1>;
// };

const Practice = props => {
  console.log("Practice ", props);
  return <h1>Practice</h1>;
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="dashboard">
        <Sidenav prefixURL={this.props.match.url} />
        <Route exact path={this.props.match.url} component={Home} />
        <Route exact path={`${this.props.match.url}/compete`} component={Compete} />
        <Route path={`${this.props.match.url}/compete/quiz/:id`} component={Quiz} />
        <Route path={`${this.props.match.url}/practice`} component={Practice} />
        <Route path={`${this.props.match.url}/add_question`} component={AddQuestion} />
      </div>
    );
  }
}

export default Dashboard;
