import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import usersReducer from "./features/users/userSlice";
export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: usersReducer,
  },
});
