import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
// import { auth } from "../firebase";
import { connect } from "react-redux";
import { signIn } from "../actions/authActions";
import FullPageSpinner from "./spinner/FullPageSpinner";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

class Login extends Component {
  // TODO: If logged-in and user visits this site, redirect them to /home
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      errors: {},
      isAuthenticated: false
    };
  }

  handleLogin = event => {
    event.preventDefault();

    let email = this.emailInput.value;
    let password = this.passwordInput.value;

    // Validation of Inputs:
    let errors = {};

    if (email === "") errors.email = "* email is required";
    if (password === "") errors.password = "* password is required";
    // TODO: Uncomment this after debugging:
    // else if (!emailRegex.test(email)) errors.email = "* email is invalid";

    if (Object.entries(errors).length === 0 && errors.constructor === Object) {
      this.props.signIn({ email, password });
      // this.setState({ redirectToReferrer: true });
    } else {
      this.setState({
        errors
      });
    }
  };

  render() {
    console.log("Login.js Props", this.props);
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (!this.props.auth.isLoaded) return <FullPageSpinner/>
    // if (redirectToReferrer) return <Redirect to={from} />;
    if (this.props.auth.uid) return <Redirect to="/dashboard" />;

    return (
      <div className="auth">
        <form className="auth-card" onSubmit={this.handleLogin}>
          <div>
            <h1 className="auth-card__logo">React Quiz</h1>
            <h2 className="auth-card__sublogo">
              Compete | Practice | Contribute
            </h2>
          </div>
          <div>
            {/* <span className="auth-card__title">Continue where you left</span> */}
            {/* <p className="auth-card__title">Login</p> */}
            <div className="inputWrapper" data-error={this.state.errors.email}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                aria-label="Email"
                placeholder="Enter your email"
                ref={el => (this.emailInput = el)}
              />
            </div>
            <div
              className="inputWrapper"
              data-error={this.state.errors.password}
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                aria-label="Password"
                placeholder="Enter your password"
                ref={el => (this.passwordInput = el)}
              />
            </div>
            {this.props.authError && <span>{this.props.authError}</span>}
          </div>
          <div>
            <button className="primaryButton" onClick={this.handleSubmit}>
              Login
            </button>
            <Link className="secondaryLink" to="/signup">
              Don't have an account? Signup
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
  //   return {
  // actionCreatorName: parameter => dispatch(actionCreatorName(parameter))
  //   };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Login);
