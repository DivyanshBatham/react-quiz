import { combineReducers } from "redux";
// import { firestoreReducer } from "redux-firestore";

import authReducer from "./authReducer";
import quizReducer from "./quizReducer";

const rootReducer = combineReducers({
  // These will be the keys in out global state.
  auth: authReducer,
  quiz: quizReducer,
  // firestore: firestoreReducer
});

export default rootReducer;
