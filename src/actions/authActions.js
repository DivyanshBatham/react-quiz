// Dispatch is a method which dispatches an action to reducer (Ideally).
// But, often we need to perform some async operation before dispatching the action,
// So we delay the action dispatch by orginially dispatch actionCreator instead of action

// Conclusion:
// Dispatch dispatches ActionCreator (which perform some async operation and then dispatches the action)
// So that action dispatching is delayed.

// Normally actionCreators return an object (action: type and payload)
// export const createProject = (project) => {
//     return {
//         type: 'ADD_PROJECT',
//         project: project
//     }
// }
// We directly disptach actions

// With Thunk we can return functions.
// // We directly disptach action cretors, which then dispatch actions
// export const createProject = project => {
//   return (dispatch, getState) => {
//     // dispatch is a method which dispatches an action to reducer
//     // When we call action creator from our component, we will return a function and halt the dispatch
//     // Make sync call then call dispatch function to pass the action to reducer.

//     dispatch({
//       type: "ADD_PROJECT",
//       project: project
//     });
//   };
// };

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNOUT_ERROR = "SIGNOUT_ERROR";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(loginRes => {
        console.log(loginRes);
        dispatch({
          type: LOGIN_SUCCESS,
          credentials: credentials
        });
      })
      .catch(err => {
        dispatch({
          type: LOGIN_ERROR,
          err
        });
      });
  };
};

export const signOut = () => {
  console.log("SingOut Action");
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
      })
      .catch(err => {
        dispatch({
          type: SIGNOUT_ERROR,
          err
        });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password) 
      .then(res => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            name: newUser.name,
            initials: newUser.name
              .split(" ")
              .map(word => word[0])
              .join("")
          });
      })
      .then(res => {
        console.log(res);
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: SIGNUP_ERROR, err });
      });
  };
};
