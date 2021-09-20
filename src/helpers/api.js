import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import envs from "../config/env";

let headers = {};

// Create an Instance
const axiosInstance = axios.create({
  baseURL: envs.BASE_URL,
  timeout: 15000,
  headers,
});

// Intercept requests
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/**
 * remove stored userToken
 */
const removeToken = () => {
  AsyncStorage.removeItem("@userToken");
  AsyncStorage.removeItem("@user");
};

//Intercept response
axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response && error.response.status === 401) {
      AsyncStorage.clear();
      AsyncStorage.removeItem("@userToken");
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;
