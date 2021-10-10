import AsyncStorage from "@react-native-async-storage/async-storage";
import { add, compareAsc } from "date-fns";
import axiosInstance from "../../../config/axios_config";
import { AuthLoginInput, User } from "../../../interfaces/user";
import { AppDispatch } from "./../../store";
import {
  authFail,
  authRequest,
  checkedOnboardingFalse,
  checkedOnboardingTrue,
  fetchUser,
  loggedOut,
  loginSuccess,
  setUser,
  userFetchFail,
} from "./user_reducer";

export const loginUser = (data: AuthLoginInput) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authRequest());
      const res = await axiosInstance.post("/auth/login", data);
      dispatch(
        loginSuccess({ data: res?.data?.user, message: "Login successful" })
      );
      saveUserTokenToStorage(res?.data?.user, res.data.token);
    } catch (error: any) {
      if (error.message === "Request failed with status code 422") {
        dispatch(authFail({ error: "Invalid credentials" }));
      } else if (error.message === "timeout of 15000ms exceeded") {
        dispatch(authFail({ error: "Network error, check your connection" }));
      } else {
        dispatch(authFail({ error: "Something went wrong, please try again" }));
      }
    }
  };
};

// Save user data to device via AsyncStorage
const saveUserTokenToStorage = (userData: User, authToken: string) => {
  AsyncStorage.setItem(
    "@authData",
    JSON.stringify({
      userData,
      authToken,
      dateAssigned: Date.now(),
    })
  );
};

// Checking for Onboarding
export const checkOnboarding = () => async (dispatch: AppDispatch) => {
  try {
    const value = await AsyncStorage.getItem("@viewedOnBoarding");
    if (value !== null) {
      const res = await checkUserAuthStatus();
      if (res) {
        const dateRes = add(res?.dateAssigned, { days: 4 });
        const dateRes2 = compareAsc(Date.now(), dateRes);
        if (dateRes2 === -1) {
          dispatch(
            loginSuccess({
              data: res?.userData,
              message: "Welcome back, we missed you",
            })
          );
        } else {
          dispatch(
            dispatch(
              authFail({
                error: "Session expired, please login again",
              })
            )
          );
        }
      }
      dispatch(checkedOnboardingTrue());
    } else {
      dispatch(checkedOnboardingFalse());
    }
  } catch (error) {
    throw error;
  }
};

// Checking user authentication status
export const checkUserAuthStatus = async () => {
  try {
    let authData = [] as any;
    authData = await AsyncStorage.getItem("@authData");
    if (!authData) {
      return null;
    } else {
      const transformedData = JSON.parse(authData);
      return transformedData;
    }
  } catch (error) {}
};

// Set user viewed onboarding status to true
export const setOnboarding = () => {
  return async (dispatch: AppDispatch) => {
    try {
      await AsyncStorage.setItem("@viewedOnBoarding", "true");
      dispatch(checkedOnboardingTrue());
    } catch (error) {
      throw error;
    }
  };
};

// Fetching user current details and making sure user data hasn't expired
export const getUser = (id: number | any) => {
  return async (dispatch: AppDispatch) => {
    console.log("ok ");

    dispatch(fetchUser());
    if (!id) {
      return false;
    }
    try {
      const res = await axiosInstance.get(`/users/${id}`);
      dispatch(setUser(res.data.user));
      return true;
    } catch (error: any) {
      dispatch(userFetchFail(error?.response?.data?.message));
      return false;
    }
  };
};

// Logout user
export const userLogout = () => {
  return async (dispatch: AppDispatch) => {
    AsyncStorage.removeItem("@userData");
    dispatch(loggedOut());
  };
};
