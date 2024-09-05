import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import waterInfoReducer from "./waterInfo/waterSlice";
import { dailyNormaReducer } from "./dailyNorma/slice";
import { waterReducer } from "./water/waterSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    waterInfo: waterInfoReducer,
    norma: dailyNormaReducer,
    water: waterReducer
  },
});

export default store;
