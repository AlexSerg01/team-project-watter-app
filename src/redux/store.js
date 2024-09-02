import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import waterInfoReducer from "./waterInfo/waterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    waterInfo: waterInfoReducer,
  },
});

export default store;
