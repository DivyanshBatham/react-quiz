import {
  TOGGLE_SIDENAV,
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN
} from "../actions/uiActions";

const initState = {
  sideNavActive: false
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_SIDENAV:
      console.log("Toggle Sidenav");
      return {
        ...state,
        sideNavActive: !state.sideNavActive
      };
    default:
      return state;
  }
};

export default uiReducer;
