import axiosInstance from "../../../config/axios_config";
import { AppDispatch } from "../../store";
import {
  fetch,
  fetchCropFail,
  fetchCropSuccess,
  fetchDefaultCropActivities,
  fetchDefaultCropActivitiesFailure,
  fetchDefaultCropActivitiesSuccess,
  submitDefaultCropActivitiesFail,
  submitDefaultCropActivitiesSuccess,
  submitingDefaultCropActivities,
} from "./crop_reducer";

// Fetching crops data
export const getCrops = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.get("/crops");
      dispatch(fetchCropSuccess({ data: res?.data?.crops }));
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          fetchCropFail({
            error: "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchCropFail({
            error: "Oops!, something went wrong while fetching latest data",
          })
        );
      }
    }
  };
};

// fetch default activities for a crop
export const fetchActivityForCrop = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchDefaultCropActivities());
    try {
      const res = await axiosInstance.get(`/crop/activity/default/${id}`);
      dispatch(fetchDefaultCropActivitiesSuccess({ data: res.data?.result }));
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          fetchDefaultCropActivitiesFailure({
            error: "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchDefaultCropActivitiesFailure({
            error: error?.response?.data?.message,
          })
        );
      }
    }
  };
};

// ========= Post Crop Activities ======
export const submitCropActivities = (data: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(submitingDefaultCropActivities());
    try {
      await axiosInstance.post("/farm-activities", data);
      dispatch(
        submitDefaultCropActivitiesSuccess({
          message: "Successfully created farm activity",
        })
      );
    } catch (error: any) {
      console.error("ee ", error);
      if (error?.message === "Network Error") {
        dispatch(
          submitDefaultCropActivitiesFail({
            error: "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          submitDefaultCropActivitiesFail({
            error: error?.response?.data?.message,
          })
        );
      }
    }
  };
};
