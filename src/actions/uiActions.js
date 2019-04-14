export const TOGGLE_SIDENAV = "TOGGLE_SIDENAV";
export const SIDEBAR_OPEN = "SIDEBAR_OPEN";
export const SIDEBAR_CLOSE = "TOGGLE_SIDENAV";

// export const toggleSidenav = () => {
//   // can't we directly dispatch from here?
//   return (dispatch, getState) => {
//     const state = getState();
//     dispatch({
//       type: TOGGLE_SIDENAV,
//       sideNavActive: !state.ui.sideNavActive
//     });
//   };
// };

export const toggleSidenav = () => {
  return {
    type: TOGGLE_SIDENAV
  };
};

export const responsiveCloseSidenav = device => {
  return dispatch => {
    if (device === "mobile")
      setTimeout(() => {
        dispatch({
          type: TOGGLE_SIDENAV
        });
      }, 1);
    else return {};
  };
};
