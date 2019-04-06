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
// We directly disptach action cretors, which then dispatch actions
export const createProject = project => {
  return (dispatch, getState) => {
    // dispatch is a method which dispatches an action to reducer
    // When we call action creator from our component, we will return a function and halt the dispatch
    // Make sync call then call dispatch function to pass the action to reducer.
    
    dispatch({
      type: "ADD_PROJECT",
      project: project
    });
  };
};

export const actionCreatorName = parameter => {
  return (dispatch, getState) => {
    // dispatch is a method which dispatches an action to reducer
    // When we call action creator from our component, we will return a function and halt the dispatch
    // Make sync call then call dispatch function to pass the action to reducer.
    
    dispatch({
      type: "ADD_ACTION",
      parameter: parameter
    });
  };
};