import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  fantasy: "fantasy",
  synthwave: "synthwave",
};

const getThemeFromLocalstorage = () => {
  const theme = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};
const initialState = {
  user: { username: "Jerome" },
  theme: getThemeFromLocalstorage(),
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("Login");
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
