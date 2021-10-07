import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User } from "../../../interfaces/user";
import { RootState } from "../../store";

const initialState: UserState = {
  authLoading: false,
  fetchingUser: false,
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
    fetchUser: (state) => {
      state.fetchingUser = true;
      state.message = null;
      state.error = null;
    },
    loginSuccess: (state, { payload }: PayloadAction<User>) => {
      state.authLoading = false;
      state.isAuthenticated = true;
      state.user = payload;
      state.message = "Logged in Successfully";
    },
    registerSuccess: (state) => {
      state.authLoading = false;
      state.message = "Registered successfully";
    },
    authFail: (state, { payload }) => {
      state.authLoading = false;
      state.error = payload;
    },
    checkedOnboardingTrue: (state) => {
      state.isCheckingUser = false;
      state.viewedOnboarding = true;
    },
    checkedOnboardingFalse: (state) => {
      state.isCheckingUser = false;
      state.viewedOnboarding = false;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.fetchingUser = false;
      state.user = payload;
      state.message = "Your latest profile data has been fetched";
      state.error = null;
    },
    userFetchFail: (state, { payload }) => {
      state.fetchingUser = false;
      state.user = null;
      state.message = null;
      state.error = payload;
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
  setUser,
  userFetchFail,
  fetchUser,
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
