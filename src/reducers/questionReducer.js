import {
  ADD_QUESTION,
  ADD_QUESTION_ERROR,
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_ERROR,
  APPROVE_QUESTION,
  LIKE_QUESTION,
  DISLIKE_QUESTION,
  REPORT_QUESTION,
} from "../actions/questionActions";

const initState = {
  isFetching: true
};

const questionReducer = (state = initState, action) => {
  // This is where we ~manipulate~ update the state.
  switch (action.type) {
    case ADD_QUESTION:
      console.log("Question Added", action.questionData);
      return state;
    case ADD_QUESTION_ERROR:
      console.log("Question Added Error, ", action.err);
      return state;

      case FETCH_QUESTION_REQUEST:
      console.log("FETCH_QUESTION started");
      return {
        ...state,
        isFetching: true,
      };

      case FETCH_QUESTION_SUCCESS:
      console.log("Question Fetched", action.questionDoc);
      return {
        ...state,
        isFetching: false,
        questionDoc: action.questionDoc
      };

    case FETCH_QUESTION_ERROR:
      console.log("Question Fetch Error, ", action.err);
      return {
        ...state,
        isFetching: false,
      };

    case APPROVE_QUESTION:
      console.log("Question Approved");
      return state;
    case LIKE_QUESTION:
      console.log("Like Question");
      return state;
    case DISLIKE_QUESTION:
      console.log("Dislike Question");
      return state;
    case REPORT_QUESTION:
      console.log("Report Question");
      return state;
    default:
      // console.log("Nothing");
      return state;
  }
};

export default questionReducer;
