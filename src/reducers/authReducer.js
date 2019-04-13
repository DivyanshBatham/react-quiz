import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from "../actions/authActions";

const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  // This is where we ~manipulate~ update the state.
  switch (action.type) {
    case "LOGIN":
      console.log("Login Reducer");
    case LOGIN_SUCCESS:
      console.log("LOGIN Success");
      return {
        ...state,
        authError: null
      };

    case LOGIN_ERROR:
      console.log("LOGIN Error");
      return {
        ...state,
        authError: action.err.message
      };

    case SIGNOUT_SUCCESS:
      console.log("SIGNOUT_SUCCESS");
      return state;

    case SIGNOUT_ERROR:
      console.log("SIGNOUT Error, ", action.err);
      return state;


    case SIGNUP_SUCCESS:
      console.log("SIGNUP_SUCCESS");
      return {
        ...state,
        authError: null
      };

    case SIGNUP_ERROR:
      console.log("SIGNUP_ERROR");
      return {
        ...state,
        authError: action.err.message
      };

    default:
      return state;
  }
};

export default authReducer;
