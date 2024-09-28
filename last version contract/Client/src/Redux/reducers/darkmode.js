import { LIGHT_MODE, DARK_MODE, TOGGLE_MODE } from "../actionTypes/darkmode";

const INITIAL_STATE = {
  darkMode: false,
};

const darkModeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIGHT_MODE:
      return {
        darkMode: false,
      };
    case DARK_MODE:
      return {
        darkMode: true,
      };
    case TOGGLE_MODE:
      return {
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export default darkModeReducer;