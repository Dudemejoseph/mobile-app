import { createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "../../../interfaces/user";
import { RootState } from "../../store";
import { PayloadType } from "./../../../interfaces/shared_components";

const initialState: UserState = {
  authLoading: false,
  isAuthenticated: false,
  user: null,
  isCheckingUser: true,
  viewedOnboarding: false,
  error: null,
  message: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.authLoading = true;
      state.message = null;
      state.error = null;
    },
    loginSuccess: (state, { payload }: PayloadType) => {
      state.authLoading = false;
      state.isAuthenticated = true;
      state.user = payload.data as unknown as User;
      state.message = payload.message;
    },
    registerSuccess: (state) => {
      state.authLoading = false;
      state.message = "Registered successfully";
    },
    authFail: (state, { payload }: PayloadType) => {
      state.authLoading = false;
      state.error = payload.error;
    },
    checkedOnboardingTrue: (state) => {
      state.isCheckingUser = false;
      state.viewedOnboarding = true;
    },
    checkedOnboardingFalse: (state) => {
      state.isCheckingUser = false;
      state.viewedOnboarding = false;
    },
    loggedOut: (state) => {
      state.authLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {
  authRequest,
  authFail,
  loginSuccess,
  loggedOut,
  registerSuccess,
  checkedOnboardingFalse,
  checkedOnboardingTrue,
} = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
