import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore package not working well with typescript at at now
import { BASE_URL } from "react-native-dotenv";

// Creating axuios client, preconfigured with base url and other fields
let axiosInstance = axios.create({
  baseURL: BASE_URL as string,
  // timeout: 15000,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export const cancelTokenSource = axios.CancelToken.source();

// Intercept requests
axiosInstance.interceptors.request.use(
  async (config) => {
    let authData = [] as any;
    authData = await AsyncStorage.getItem("@authData");
    if (authData) {
      const transformedData = JSON.parse(authData);
      config.headers.Authorization = `Bearer ${transformedData.authToken}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

//Intercept responses
axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve) => {
      resolve(response);
    }),
  (error) => {
    if (error.response && error.response.status === 401) {
      //   removeToken();
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;
