import { createSelector } from '@reduxjs/toolkit'
import { forgotPassword, updatePassword } from './operations'

export const AuthReducerSelector = (state) => state.auth

export const forgotPasswordSelector = createSelector(
  AuthReducerSelector,
  (state) => state.forgotPassword
)

export const updatePasswordSelector = createSelector(
  AuthReducerSelector,
  (state) => state.updatePassword
)

// Існуючі селектори
export const tokenSelector = createSelector(
  AuthReducerSelector,
  (state) => state.token
)

export const isLoggedInSelector = createSelector(
  AuthReducerSelector,
  (state) => state.isAuthenticated
)

export const userSelector = createSelector(
  AuthReducerSelector,
  (state) => state.user
)
export const selectWaterNorma = createSelector(
  AuthReducerSelector,
  (state) => state.user.user.dailyWaterIntake
)