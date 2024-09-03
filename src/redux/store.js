import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import waterInfoReducer from "./waterInfo/waterSlice";
import { dailyNormaReducer } from "./dailyNorma/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    waterInfo: waterInfoReducer,
    norma: dailyNormaReducer
  },
});

export default store;
