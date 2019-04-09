const initState = {
  // dummyToken: "DUMMY TOKEN"
};

const questionReducer = (state = initState, action) => {
  // This is where we ~manipulate~ update the state.
  switch (action.type) {
    case "ADD_QUESTION":
      console.log("Question Added", action.questionData);
      return state;
    case "ADD_QUESTION_ERROR":
      console.log("Question Added Error, ", action.err);
      return state;
    case "APPROVE_QUESTION":
      console.log("Question Approved");
      return state;
    case "LIKE_QUESTION":
      console.log("Like Question");
      return state;
    case "DISLIKE_QUESTION":
      console.log("Dislike Question");
      return state;
    case "REPORT_QUESTION":
      console.log("Report Question");
      return state;
    default:
      // console.log("Nothing");
      return state;
  }
  return state;
};

export default questionReducer;
