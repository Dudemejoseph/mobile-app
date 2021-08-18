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
      state.message = "Successfully, welcome to AfriHealth";
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
      const res = await axiosInstance.post("/login", data);
      if (res.data.result !== null) {
        dispatch(loginSuccess(res?.data?.result));
      } else {
        dispatch(fetchFail(res?.data?.message));
      }
      console.log(res.data);
    } catch (error) {
      dispatch(fetchFail("Something went wrong, please try again"));
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

      console.log(res.data);
    } catch (error) {
      dispatch(fetchFail("Something went wrong, please try again"));
      console.log(error.response.data.message);
    }
  };
};

// export const logoutUser = () => {
//   return async dispatch => {
//     dispatch(loggedOut());
//   };
// };
