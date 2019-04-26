export const REGISTER_FOR_QUIZ = "REGISTER_FOR_QUIZ";
export const REGISTER_FOR_QUIZ_ERROR = "REGISTER_FOR_QUIZ_ERROR";

export const registerForQuiz = (quizId) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const state = getState();
    
    // TODO: Change uid to userId.
    let uid = state.firebase.auth.uid;
    let userInitials = state.firebase.profile.initials; // For display
    let userName = state.firebase.profile.name; // For display

    const firestore = getFirestore();
    const firebase = getFirebase();
    firestore
      .collection("quizzes")
      .doc(quizId)
      .update({
        registeredUsers: firebase.firestore.FieldValue.arrayUnion({uid, userName, userInitials})
      })
      .then(() => {
        dispatch({
          type: REGISTER_FOR_QUIZ
        });
      })
      .catch(err => {
        dispatch({
          type: REGISTER_FOR_QUIZ_ERROR,
          err: err
        });
      });
  };
};
