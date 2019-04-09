import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
import quizReducer from "./quizReducer";
import questionReducer from "./questionReducer";

const rootReducer = combineReducers({
  // These will be the keys in out global state.
  auth: authReducer,
  question: questionReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
