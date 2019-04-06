const initState = {
    dummyToken: "DUMMY TOKEN"
};

const authReducer = (state = initState, action) => {
  // This is where we ~manipulate~ update the state.
  switch(action.type) {
      case 'LOGIN': 
        console.log("Login Reducer")
  }
  return state;
};

export default authReducer;
