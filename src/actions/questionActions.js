export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ERROR = "ADD_QUESTION_ERROR";
export const FETCH_QUESTION = "FETCH_QUESTION";
export const FETCH_QUESTION_ERROR = "FETCH_QUESTION_ERROR";
export const LIKE_QUESTION = "LIKE_QUESTION";
export const LIKE_QUESTION_ERROR = "LIKE_QUESTION_ERROR";
export const DISLIKE_QUESTION = "DISLIKE_QUESTION";
export const REPORT_QUESTION = "REPORT_QUESTION";
export const APPROVE_QUESTION = "APPROVE_QUESTION";

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
    const firestore = getFirestore();
    firestore
      .collection("questions")
      .doc(questionRef.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          dispatch({
            type: FETCH_QUESTION,
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

export const likeQuestion = questionData => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const uid = state.firebase.auth.uid;
    let newLikes = questionData.likes;

    if (questionData.likes.includes(uid))
      newLikes.splice(questionData.likes.findIndex(uid), 1);
    else newLikes.push(uid);

    const firestore = getFirestore();
    firestore
      .collection("questions")
      // .doc(questionData.questionId)
      .doc("TtnJ34YRKX4kik8Dwo4G")
      .update({
        // likes: [...questionData.likes, state.firebase.auth.uid]
        // likes: [state.firebase.auth.uid]
        likes: newLikes
      })
      .then(() => {
        dispatch({
          type: LIKE_QUESTION,
          questionData
        });
      });
  };
};

export const dislikeQuestion = questionData => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const uid = state.firebase.auth.uid;
    let newDislikes = questionData.dislikes;

    if (questionData.dislikes.includes(uid))
      newDislikes.splice(questionData.dislikes.findIndex(uid), 1);
    else newDislikes.push(uid);

    const firestore = getFirestore();
    firestore
      .collection("questions")
      // .doc(questionData.questionId)
      .doc("TtnJ34YRKX4kik8Dwo4G")
      .update({
        // dislikes: [...questionData.dislikes, state.firebase.auth.uid]
        // dislikes: [state.firebase.auth.uid]
        dislikes: newDislikes
      })
      .then(() => {
        dispatch({
          type: LIKE_QUESTION,
          questionData
        });
      });
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
