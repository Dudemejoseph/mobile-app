import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../../config/axios_config";
import { AuthLoginInput, AuthToken, User } from "../../../interfaces/user";
import { AppDispatch } from "./../../store";
import {
  authFail,
  authRequest,
  checkedOnboardingFalse,
  checkedOnboardingTrue,
  fetchUser,
  loginSuccess,
  setUser,
  userFetchFail,
} from "./user_reducer";

export const loginUser = (data: AuthLoginInput) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authRequest());
      const res = await axiosInstance.post("/auth/login", data);
      dispatch(loginSuccess(res?.data?.user));
      saveUserTokenToStorage(res?.data?.user?.token, res?.data?.user?.id);
      return res?.data;
    } catch (error: any) {
      if (error.message === "Request failed with status code 422") {
        dispatch(authFail("Invalid credentials"));
      }
      if (error.message === "timeout of 15000ms exceeded") {
        dispatch(authFail("Network error, check your connection"));
      }
    }
  };
};

// Save user token to device via AsyncStorage
const saveUserTokenToStorage = (authToken: string, userId: number) => {
  AsyncStorage.setItem(
    "@authToken",
    JSON.stringify({
      authToken,
      savedOn: Date.now(),
      userId,
    })
  );
};

// Checking for Onboarding
export const checkOnboarding = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnBoarding");
      if (value !== null) {
        const res = await checkUserAuthStatus();
        if (res) {
          dispatch(loginSuccess(res));
        }
        dispatch(checkedOnboardingTrue());
      } else {
        dispatch(checkedOnboardingFalse());
      }
    } catch (error) {
      throw error;
    }
  };
};

// Checking user authentication status
export const checkUserAuthStatus = async () => {
  try {
    let authToken = [] as any;
    authToken = await AsyncStorage.getItem("@authToken");
    if (!authToken) {
      return null;
    } else {
      const transformedData = JSON.parse(authToken) as AuthToken;
      const res = getUser(transformedData.userId) as unknown as User;
      return res;
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
