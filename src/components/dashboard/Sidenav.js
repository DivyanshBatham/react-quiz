import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";
import { toggleSidenav } from "../../actions/uiActions";

class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("SIDENAV, ", this.props);
    return (
      <nav className={this.props.sideNavActive ? "sidenav activeSidenav" : "sidenav"}>
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
        <a onClick={() => this.props.dispatch(signOut())}>Logout</a>
        <button onClick={() => this.props.dispatch(toggleSidenav())}>
          Close Sidebar
        </button>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    sideNavActive: state.ui.sideNavActive
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     signOut: () => dispatch(signOut())
//   };
// };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(Sidenav);
