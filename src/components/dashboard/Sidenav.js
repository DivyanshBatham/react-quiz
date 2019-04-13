import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";
import { toggleSidenav } from "../../actions/uiActions";
// import Spinner from "../spinner/Spinner";

class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("SIDENAV, ", this.props);
    return (
      <nav
        className={
          this.props.sideNavActive ? "sidenav activeSidenav" : "sidenav"
        }
      >
        <div>
          {this.props.profile.name ? (
            <div className="userProfile">
              <div className="profilePicture">
                {this.props.profile.initials}
                {/* <img
                  src="https://randomuser.me/api/portraits/men/60.jpg"
                  alt="Profile Picture"
                /> */}
              </div>
              <span>{this.props.profile.name}</span>
            </div>
          ) : (
            <div className="userProfile">
              <div className="box shine" />
              <span className="lines shine" />
            </div>
          )}
          <div className="links">
            <NavLink
              exact
              to={`${this.props.prefixURL}`}
              onClick={() => {
                this.props.dispatch(toggleSidenav());
              }}
            >
              <div className="svgWrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
              </div>
              Dashboard
            </NavLink>
            <NavLink
              to={`${this.props.prefixURL}/compete`}
              onClick={() => {
                this.props.dispatch(toggleSidenav());
              }}
            >
              <div className="svgWrapper">
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 46.999 46.999"
                  style={{ enableBackground: "new 0 0 46.999 46.999" }}
                >
                  <g>
                    <g id="Layer_1_76_">
                      <g>
                        <path
                          d="M43.992,28.488l-5.465-4.372c-0.388-0.312-0.869-0.479-1.365-0.479h-3.045l0.389,2.418
				c0.199,1.24-0.328,2.486-1.359,3.207c-0.562,0.394-1.219,0.592-1.878,0.592c-0.551,0-1.103-0.139-1.603-0.418l-6.167-3.457
				l-6.167,3.455c-1.097,0.615-2.449,0.549-3.48-0.173c-1.031-0.721-1.56-1.967-1.359-3.208l0.389-2.417H9.836
				c-0.497,0-0.978,0.169-1.366,0.479l-5.465,4.371c-0.518,0.414-0.82,1.044-0.82,1.707v14.619c0,1.207,0.979,2.187,2.186,2.187
				h38.255c1.207,0,2.187-0.979,2.187-2.187V30.193C44.812,29.531,44.511,28.902,43.992,28.488z M38.254,40.236
				c0,0.604-0.488,1.094-1.092,1.094H9.835c-0.604,0-1.093-0.489-1.093-1.094v-5.465c0-0.604,0.489-1.094,1.093-1.094H37.16
				c0.604,0,1.094,0.489,1.094,1.094V40.236L38.254,40.236z"
                        />
                        <path
                          d="M16.047,17.722L14.65,26.4c-0.067,0.414,0.109,0.828,0.453,1.068c0.344,0.241,0.794,0.264,1.16,0.059l7.235-4.053
				l7.235,4.053c0.167,0.095,0.351,0.141,0.534,0.141c0.22,0,0.439-0.066,0.626-0.197c0.344-0.24,0.521-0.654,0.453-1.068
				l-1.397-8.679l5.907-6.137c0.283-0.294,0.378-0.721,0.248-1.107s-0.465-0.668-0.868-0.731L28.129,8.49l-3.638-7.856
				C24.312,0.248,23.924,0,23.499,0s-0.813,0.248-0.992,0.634L18.869,8.49l-8.107,1.256c-0.403,0.063-0.738,0.345-0.868,0.731
				c-0.13,0.386-0.035,0.813,0.248,1.107L16.047,17.722z M20.859,11.233l0.608-0.13c1.828-0.396,1.317-2.271,2.717-2.271
				c0.526,0,0.954,0.227,0.954,1.117v9.352c0,0.856-0.33,1.447-1.25,1.447c-0.922,0-1.251-0.591-1.251-1.447v-6.256h-2.124
				c-0.543,0-0.84-0.196-0.84-0.872C19.672,11.564,20.002,11.397,20.859,11.233z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              Compete
            </NavLink>
            <NavLink
              to={`${this.props.prefixURL}/practice`}
              onClick={() => {
                this.props.dispatch(toggleSidenav());
              }}
            >
              <div className="svgWrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
              Practice
            </NavLink>
            <NavLink
              to={`${this.props.prefixURL}/add_question`}
              onClick={() => {
                this.props.dispatch(toggleSidenav());
              }}
            >
              <div className="svgWrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
              Contribute
            </NavLink>
            <a onClick={() => this.props.dispatch(signOut())}>
              <div className="svgWrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              Logout
            </a>
          </div>
        </div>

        <div className="signature">
          <span className="product">React-Quiz v0</span>
          <div>Released under the MIT License</div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  console.log("Side nav >>>> ", state);
  return {
    auth: state.firebase.auth,
    sideNavActive: state.ui.sideNavActive
  };
};

export default connect(mapStateToProps)(Sidenav);
