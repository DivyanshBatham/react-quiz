import React, { Component } from "react";
import { toggleSidenav } from "../../actions/uiActions";
import { connect } from "react-redux";

const Placeholder = props => {
  return (
    <main className={props.sideNavActive ? "activeSidenav" : null}>
      <div className="container">
        <div className="placeholder">
          <div className="placeholder__heading">{props.title}</div>
          <div className="placeholder__description">(Coming Soon)</div>
          <div
            className="placeholder__button"
            onClick={() => {
              props.dispatch(toggleSidenav());
            }}
          >
            Click to open sidenav.
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = state => {
  return {
    sideNavActive: state.ui.sideNavActive
  };
};

export default connect(mapStateToProps)(Placeholder);
