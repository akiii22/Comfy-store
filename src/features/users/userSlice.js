import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  fantasy: "fantasy",
  synthwave: "synthwave",
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};
const getThemeFromLocalstorage = () => {
  const theme = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};
const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalstorage(),
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logout successfully");
    },
    toggleTheme: (state) => {
      const { fantasy, synthwave } = themes;
      state.theme = state.theme === fantasy ? synthwave : fantasy;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = usersSlice.actions;

export default usersSlice.reducer;
