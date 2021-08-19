import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/api";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ====== LOGIN REDUCERS & ACTIONS ========
    fetch: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = payload;
      state.message = "Logged in Successfully";
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = payload;
      state.message = "Account created successfully";
    },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = payload;
    },
    loggedOut: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { fetch, fetchFail, loginSuccess, registerSuccess, loggedOut } =
  userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state) => state.user;

/**
 * Login user
 * @param {*} data
 * @returns
 */
export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.post("/auth/login", data);
      dispatch(loginSuccess(res.data));
      console.log(res.data);
    } catch (error) {
      dispatch(fetchFail(error.response.data.message));
      console.log(error);
    }
  };
};

/**
 * Register user
 * @param {*} data
 * @returns
 */
export const registerUser = (data) => {
  console.log(data);
  return async (dispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.post("/auth/register", data);

      dispatch(activateUser(res.data.user.email_token));
    } catch (error) {
      dispatch(fetchFail(error.response.data.message));
    }
  };
};

/**
 * Activate User
 * @param {*} data
 * @returns
 */
export const activateUser = (token) => {
  return async (dispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.get(`/auth/activate/${token}`);
      dispatch(registerSuccess(res.data.user));
      const userToken = res.data.token;
      await AsyncStorage.setItem("@userToken", userToken);
    } catch (error) {
      dispatch(fetchFail("Something went wrong, please try again"));
      console.log(error.response.data.message);
    }
  };
};
