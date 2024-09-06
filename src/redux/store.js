import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage буде використовуватись за замовчуванням
import authReducer from "./auth/slice";
import waterInfoReducer from "./waterInfo/waterSlice";
import { dailyNormaReducer } from "./dailyNorma/slice";
import { waterReducer } from "./water/waterSlice";

// Конфігурація для persist
const persistConfig = {
  key: "root", // ключ для збереження стану
  storage, // сховище, яке буде використовуватись
  whitelist: ["auth"], // вкажіть ред'юсери, які ви хочете зберігати
};

// Об'єднання ред'юсерів
const rootReducer = combineReducers({
  auth: authReducer,
  waterInfo: waterInfoReducer,
  norma: dailyNormaReducer,
  water: waterReducer,
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
