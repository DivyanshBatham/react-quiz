import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";

class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("SIDENAV, ", this.props);
    return (
      <nav className="sidenav">
        <span>{this.props.profile.name}</span>
        <NavLink exact to={`${this.props.prefixURL}`}>
          Dashboard
        </NavLink>
        <NavLink to={`${this.props.prefixURL}/compete`}>Compete</NavLink>
        <NavLink to={`${this.props.prefixURL}/practice`}>Practice</NavLink>
        <NavLink to={`${this.props.prefixURL}/add_question`}>
          Add Question
        </NavLink>
        {/* <NavLink to={"/logout"}>Logout</NavLink> */}
        <a onClick={this.props.signOut}>Logout</a>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Sidenav);
