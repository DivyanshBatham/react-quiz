export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ERROR = "ADD_QUESTION_ERROR";
export const FETCH_QUESTION_REQUEST = "FETCH_QUESTION_REQUEST";
export const FETCH_QUESTION_SUCCESS = "FETCH_QUESTION_SUCCESS";
export const FETCH_QUESTION_ERROR = "FETCH_QUESTION_ERROR";
export const LIKE_QUESTION = "LIKE_QUESTION";
export const LIKE_QUESTION_ERROR = "LIKE_QUESTION_ERROR";
export const DISLIKE_QUESTION = "DISLIKE_QUESTION";
export const REPORT_QUESTION = "REPORT_QUESTION";
export const APPROVE_QUESTION = "APPROVE_QUESTION";
export const SUBMIT_ANSWER = "SUBMIT_ANSWER";
export const SUBMIT_ANSWER_ERROR = "SUBMIT_ANSWER_ERROR";

export const createQuestion = questionData => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const firestore = getFirestore();
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
        likes: [],
        dislikes: [],
        authorId: state.firebase.auth.uid,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({
          type: ADD_QUESTION,
          questionData
        });
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: ADD_QUESTION_ERROR,
          err
        });
      });
  };
};

export const fetchQuestion = questionRef => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({
      type: FETCH_QUESTION_REQUEST
    });

    const firestore = getFirestore();
    firestore
      .collection("questions")
      .doc(questionRef.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          dispatch({
            type: FETCH_QUESTION_SUCCESS,
            questionDoc: doc.data()
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: FETCH_QUESTION_ERROR,
          err
        });
      });
  };
};

export const approveQuestion = question => {
  return (dispatch, getState) => {
    // ASYNC Call.then( dispatch.. )
    dispatch({
      type: APPROVE_QUESTION,
      question
    });
  };
};

export const likeQuestion = (questionDoc, questionRef) => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const uid = state.firebase.auth.uid;
    let newLikes = questionDoc.likes;
    let newDislikes = questionDoc.dislikes;

    if (questionDoc.likes.includes(uid))
      newLikes.splice(
        questionDoc.likes.findIndex(likedById => likedById === uid),
        1
      );
    else newLikes.push(uid);

    if (questionDoc.dislikes.includes(uid))
      newDislikes.splice(
        questionDoc.dislikes.findIndex(dislikedById => dislikedById === uid),
        1
      );

    const firestore = getFirestore();
    firestore
      .collection("questions")
      .doc(questionRef.id)
      .update({
        likes: newLikes,
        dislikes: newDislikes
      })
      .then(() => {
        dispatch({
          type: LIKE_QUESTION,
          questionDoc
        });
      });
  };
};

export const dislikeQuestion = (questionDoc, questionRef) => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const uid = state.firebase.auth.uid;
    let newDislikes = questionDoc.dislikes;
    let newLikes = questionDoc.likes;

    if (questionDoc.dislikes.includes(uid))
      newDislikes.splice(
        questionDoc.dislikes.findIndex(dislikedById => dislikedById === uid),
        1
      );
    else newDislikes.push(uid);

    if (questionDoc.likes.includes(uid))
      newLikes.splice(
        questionDoc.likes.findIndex(likedById => likedById === uid),
        1
      );

    const firestore = getFirestore();
    firestore
      .collection("questions")
      .doc(questionRef.id)
      .update({
        dislikes: newDislikes,
        likes: newLikes
      })
      .then(() => {
        dispatch({
          type: DISLIKE_QUESTION,
          questionDoc
        });
      });
  };
};

export const submitAnswer = (
  quizDoc,
  quizId,
  questionDoc,
  choosenOption,
  questionId
) => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const firestore = getFirestore();

    let response = {
      userId: state.firebase.auth.uid,
      userInitials: state.firebase.profile.initials,
      choosenOption: choosenOption,
      timestamp: firestore.FieldValue.serverTimestamp()
      // Option 1:
      // questionId: questionId

      // timestampSys: new Date()
      // Maybe calculate time taken or submitted at seconds, for better results page.
      // IDEA: Setup a function to use the timestamp and startTime to calculated answered in seconds...
    };

    if (questionDoc.correctOption === choosenOption) {
      // quizzes/quizId/correctResponses/:responseId(autogen)/response

      // Option 2:
      // quizzes/:quizId/responses/:questionId/(correctResponses|incorrectResponses)
      firestore
        // .collection("quizzes")
        // .doc(quizId)
        // .collection("responses")
        // .doc(questionId)
        // .collection("correctResponses")
        // .add(response)
        .collection("quizzes")
        .doc(quizId)
        .collection("correctResponses")
        .add(response)
        .then(() => {
          dispatch({
            type: SUBMIT_ANSWER,
            questionDoc
          });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      firestore
        // .collection("quizzes")
        // .doc(quizId)
        // .collection("responses")
        // .doc(questionId)
        // .collection("incorrectResponses")
        // .add(response)
        .collection("quizzes")
        .doc(quizId)
        .collection("incorrectResponses")
        .add(response)
        .then(() => {
          dispatch({
            type: SUBMIT_ANSWER,
            questionDoc
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
};

export const reportQuestion = question => {
  return (dispatch, getState) => {
    // ASYNC Call.then( dispatch.. )
    dispatch({
      type: REPORT_QUESTION,
      question
    });
  };
};
