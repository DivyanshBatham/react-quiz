import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// My custom export with preconfigured firebase
import firebase, {auth, database} from './firebase.js';

// Styles:
import "./bootstrap-grid.min.css";
import "./App.scss";

// Components:
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/dashboard/Dashboard.js";


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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // timer: 60
    };
  }

  // componentWillMount() {
  //   auth.onAuthStateChanged(firebaseUser => {
  //     if (firebaseUser) {
  //       console.log("Logged In, ", firebaseUser);
  //       this.setState({
  //         loggedIn: true
  //       });
  //     } else {
  //       console.log("Not Logged In");
  //       this.setState({
  //         loggedIn: false
  //       });
  //     }
  //   });
  // }

  componentDidMount() {
    // auth.onAuthStateChanged(user => {
    //   this.setState({ user });
    // });
    // const db = f.database();
    // const dbRef = db.ref().child('timer');

    // dbRef.on('value', snapshot => {
    //   this.setState({
    //     timer: snapshot.val()
    //   })
    // })
    // const rootRef = firebase.database.ref('react-quiz-major');
    // const timerRef = rootRef.child('timer');
    // timerRef.on('value', snap => {
    //   this.setState({
    //     timer: snap.val()
    //   })
    // })
  }

  // login = () => {
  //   auth.signInWithPopup(provider);
  // };
  // logout = () => {
  //   auth.signOut();
  // };

  // https://reacttraining.com/react-router/web/example/auth-workflow
  // PrivateRoute = ({ component: Component, ...rest }) => {
  //   return (
  //     <Route
  //       {...rest}
  //       render={props =>
  //         fakeAuth.isAuthenticated ? (
  //           <Component {...props} />
  //         ) : (
  //           <Redirect
  //             to={{
  //               pathname: "/login",
  //               state: { from: props.location }
  //             }}
  //           />
  //         )
  //       }
  //     />
  //   );
  // }

  render() {
    console.log("App.js", this.props);
    return (
      // <h1>{this.state.timer}</h1>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <LandingPage/> */}
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/dashboard" component={Dashboard}/>
          {/* <this.PrivateRoute path="/dashboard" component={Dashboard} /> */}
          {/* <Route path="/quiz/:id" component={}/> */}
          {/* <Route path="/home" component={}/> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
