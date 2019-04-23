import { REGISTER_FOR_QUIZ, REGISTER_FOR_QUIZ_ERROR } from "../actions/quizActions";

const initState = {};

const quizReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_FOR_QUIZ:
      console.warn("Registered For Quiz");
      return state;
    case REGISTER_FOR_QUIZ_ERROR:
      console.warn("Error Registering For Quiz");
      return state;
    default:
      return state;
  }
};

export default quizReducer;
