import axiosInstance from "../../../config/axios_config";
import { AppDispatch } from "../../store";
import {
  fetchCountriesFail,
  fetchCountriesSuccess,
  fetchCropsFail,
  fetchCropsSuccess,
  fetchingCountries,
  fetchingCrops,
  fetchingStates,
  fetchStatesFail,
  fetchStatesSuccess,
} from "./utilties_reducer";

// Fetch countries
export const fetchCountries = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchingCountries());
    try {
      const res = await axiosInstance.get("/utility/countries");
      dispatch(fetchCountriesSuccess({ data: res.data.countries }));
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          fetchCountriesFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchCountriesFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};

// Fetch States
export const fetchStates = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchingStates());
    try {
      const res = await axiosInstance.get("/utility/states/161");
      dispatch(fetchStatesSuccess({ data: res.data.states }));
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          fetchStatesFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchStatesFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};

//Fetch Crops
export const fetchCrops = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchingCrops());
    try {
      const res = await axiosInstance.get("/crops");
      dispatch(fetchCropsSuccess({ data: res.data.crops }));
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          fetchCropsFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchCropsFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};
