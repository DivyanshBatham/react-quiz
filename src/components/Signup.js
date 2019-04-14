import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../actions/authActions";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  handleSignup = event => {
    event.preventDefault();

    let email = this.emailInput.value;
    let password = this.passwordInput.value;
    let name = this.nameInput.value;

    // Validation of Inputs:
    let errors = {};

    if (name === "") errors.name = "* name is required";
    if (email === "") errors.email = "* email is required";
    if (password === "") errors.password = "* password is required";
    // TODO: Uncomment this after debugging:
    // if (repeatPassword === "") errors.repeatPassword = "* password is required";
    // else if (!emailRegex.test(email)) errors.email = "* email is invalid";

    if (Object.entries(errors).length === 0 && errors.constructor === Object) {
      this.props.signUp({ name, email, password });
      // auth
      //   .createUserWithEmailAndPassword(email, password)
      //   .then(user => console.log(user))
      //   .catch(err => console.error(err.message));
    } else {
      this.setState({
        errors
      });
    }
  };

  render() {
    if (this.props.auth.uid) return <Redirect to="/dashboard" />;

    return (
      <div className="auth">
        <form className="auth-card" onSubmit={this.handleSignup}>
          <div>
            <h1 className="auth-card__logo">React Quiz</h1>
            <h2 className="auth-card__sublogo">
              Compete | Practice | Contribute
            </h2>
          </div>
          <div>
            <div className="inputWrapper" data-error={this.state.errors.name}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                ref={el => (this.nameInput = el)}
              />
            </div>
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
                id="password"
                type="password"
                placeholder="Enter your password"
                ref={el => (this.passwordInput = el)}
              />
            </div>
            {this.props.authError && <span>{this.props.authError}</span>}
          </div>
          <div>
            <button className="primaryButton" onClick={this.handleSubmit}>
              Sign up
            </button>
            <Link className="secondaryLink" to="/login">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: creds => dispatch(signUp(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
