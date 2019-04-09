import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "./firebase.js";

// Redux:
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux"; // This binds the Redux stuff to props.

// Redux Middlewares (thunk):
import thunk from "redux-thunk"; // Middleware between action dispatcher and reducers
// Redux Middlewares (Redux + Firebase):
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";

// Reducers:
import rootReducer from "./reducers/rootReducer";

// Creating Store: we can pass a number of middlewares which are basically store enhancer.
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true
    })
  ),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// thunk allows are us to return function inside action creator which can async interact with db.

// store.firebaseAuthIsReady.then(() => {
  // Adding Provider:
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
// });

// // Adding Provider:
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
