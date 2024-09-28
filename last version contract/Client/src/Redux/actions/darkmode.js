import { LIGHT_MODE, DARK_MODE, TOGGLE_MODE } from "../actionTypes/darkmode";

export const setLightMode = () => ({
  type: LIGHT_MODE,
});

export const setDarkMode = () => ({
  type: DARK_MODE,
});

export const toggleMode = () => ({
  type: TOGGLE_MODE,
});