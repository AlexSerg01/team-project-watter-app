export const selectUserData = (state) => state.user.data;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export const selectUserEmail = (state) => state.user.data?.email;
export const selectUserPhoto = (state) => state.user.data?.photo;
export const selectUserDailyWaterIntake = (state) =>
  state.user.data?.dailyWaterIntake;
export const selectUserGender = (state) => state.user.data?.gender;
export const selectUserName = (state) => state.user.data?.name;
