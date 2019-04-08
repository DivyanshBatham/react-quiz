export const createQuestion = questionData => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // ASYNC Call.then( dispatch.. )
    const state = getState();
    console.log(questionData);
    const firestore = getFirestore();
    // dispatch({
    //   type: "ADD_QUESTION",
    //   questionData
    // });
    firestore
      .collection("questions")
      .add({
        question: questionData.question,
        options: [
          questionData.optionOne,
          questionData.optionTwo,
          questionData.optionThree,
          questionData.optionFour
        ],
        correctOption: questionData.correctOption,
        likes: 0,
        dislikes: 0,
        authorId: state.firebase.auth.uid,
        createdAt: new Date()

        // Hardcoded:
        // question: "Test Question",
        // code: "Test code",
        // options: ["Option1", "Option2", "Option3", "Option4"],
        // answer: 2,
        // likes: 0,
        // dislikes: 0,
        // authorId: 12345,
        // createdAt: new Date()
      })
      .then(() => {
        dispatch({
          type: "ADD_QUESTION",
          questionData
        });
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: "ADD_QUESTION_ERROR",
          err
        });
      });
  };
};

export const approveQuestion = question => {
  return (dispatch, getState) => {
    // ASYNC Call.then( dispatch.. )
    dispatch({
      type: "APPROVE_QUESTION",
      question
    });
  };
};

export const likeQuestion = question => {
  return (dispatch, getState) => {
    // ASYNC Call.then( dispatch.. )
    dispatch({
      type: "LIKE_QUESTION",
      question
    });
  };
};

export const dislikeQuestion = question => {
  return (dispatch, getState) => {
    // ASYNC Call.then( dispatch.. )
    dispatch({
      type: "DISLIKE_QUESTION",
      question
    });
  };
};

export const reportQuestion = question => {
  return (dispatch, getState) => {
    // ASYNC Call.then( dispatch.. )
    dispatch({
      type: "REPORT_QUESTION",
      question
    });
  };
};
