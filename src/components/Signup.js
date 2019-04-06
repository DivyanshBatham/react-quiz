import React, { Component } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

class Signup extends Component {
  // TODO: If logged-in and user visits this site, redirect them to /home
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
    let repeatPassword = this.repeatPasswordInput.value;

    // Validation of Inputs:
    let errors = {};

    if (email === "") errors.email = "* email is required";
    if (password === "") errors.password = "* password is required";
    // TODO: Uncomment this after debugging:
    // if (repeatPassword === "") errors.repeatPassword = "* password is required";
    // else if (!emailRegex.test(email)) errors.email = "* email is invalid";

    if (Object.entries(errors).length === 0 && errors.constructor === Object) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => console.log(user))
        .catch(err => console.error(err.message));
    } else {
      this.setState({
        errors
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Signup Form</h1>
        <form onSubmit={this.handleSignup}>
          <div className="inputWrapper" data-error={this.state.errors.email}>
            <input
              type="text"
              aria-label="Email"
              placeholder="Email"
              ref={el => (this.emailInput = el)}
            />
          </div>
          <div className="inputWrapper" data-error={this.state.errors.password}>
            <input
              type="password"
              aria-label="Password"
              placeholder="Password"
              ref={el => (this.passwordInput = el)}
            />
          </div>
          <div
            className="inputWrapper"
            data-error={this.state.errors.repeatPassword}
          >
            <input
              type="password"
              aria-label="Repeat Password"
              placeholder="Repeat Password"
              ref={el => (this.repeatPasswordInput = el)}
            />
          </div>
          <button className="cta cta-sub" onClick={this.handleSubmit}>
            Sign up
          </button>
        </form>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    );
  }
}

export default Signup;
