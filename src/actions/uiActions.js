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

// HELP: Should I getState here and send the changed value as payload to reducer? Or just change the value in reducer.

// export const toggleSidenav = () => {
//   // can't we directly dispatch from here?
//   return (dispatch, getState) => {
//     // This looked excess work to me
//     dispatch({
//       type: TOGGLE_SIDENAV
//     })
//   };
// };

// Do this? yes
// That's what I was asking you since the beginning LOL
// Maybe I worded it all wrong
// OR I ran with an assumption :-P

// and then the reducer is actually set up for this already

export const toggleSidenav = () => {
    return{
      type: TOGGLE_SIDENAV
    }
};