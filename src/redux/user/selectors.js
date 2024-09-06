import { createSelector } from "@reduxjs/toolkit";

// Основний селектор для отримання стану користувача
export const selectUserState = (state) => state.user;

// Селектор для отримання інформації про користувача
export const selectUserInfo = createSelector(
  [selectUserState],
  (userState) => userState.data
);

// Селектор для отримання статусу запиту
export const selectUserStatus = createSelector(
  [selectUserState],
  (userState) => userState.status
);

// Селектор для отримання повідомлення про помилку
export const selectUserError = createSelector(
  [selectUserState],
  (userState) => userState.error
);

// Селектор для отримання фото користувача
export const selectUserPhoto = createSelector(
  [selectUserState],
  (userState) => userState.data?.photo
);

// Селектор для отримання добового споживання води користувачем
export const selectUserDailyWaterIntake = createSelector(
  [selectUserState],
  (userState) => userState.data?.dailyWaterIntake
);
