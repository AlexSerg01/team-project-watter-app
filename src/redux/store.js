import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage буде використовуватись за замовчуванням
import authReducer from "./auth/slice";
// import waterInfoReducer from "./waterInfo/waterSlice";
// import { dailyNormaReducer } from "./dailyNorma/slice";
import { waterReducer } from "./water/waterSlice";
import { userReducer } from "./user/slice";

// Конфігурація для persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Об'єднання ред'юсерів
const rootReducer = combineReducers({
  auth: authReducer,
  // waterInfo: waterInfoReducer,
  // norma: waterReducer,
  water: waterReducer,
  user: userReducer,
});

// persistReducer для збереження стану
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Налаштування store з persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});

// Експортуємо persistor
export const persistor = persistStore(store);
export default store;
