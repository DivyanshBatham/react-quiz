import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
// import quizReducer from "./quizReducer";
import questionReducer from "./questionReducer";
import uiReducer from "./uiReducer";

const rootReducer = combineReducers({
  // These will be the keys in out global state.
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  question: questionReducer,
  ui: uiReducer
});

export default rootReducer;
