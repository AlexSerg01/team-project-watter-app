import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import waterInfoReducer from "./waterInfo/waterSlice";
import { waterReducer } from "./water/waterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    waterInfo: waterInfoReducer,
    water: waterReducer
  },
});

export default store;
