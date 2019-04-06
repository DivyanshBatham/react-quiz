import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav className="sidenav">
        <span>Person Name</span>
        <NavLink exact to={`${this.props.prefixURL}`}>Dashboard</NavLink>
        <NavLink to={`${this.props.prefixURL}/compete`}>Compete</NavLink>
        <NavLink to={`${this.props.prefixURL}/practice`}>Practice</NavLink>
        <NavLink to={`${this.props.prefixURL}/add_question`}>Add Question</NavLink>
        <NavLink to={"/logout"}>Logout</NavLink>
      </nav>
    );
  }
}

export default Sidenav;
