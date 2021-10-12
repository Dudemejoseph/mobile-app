import { CreateFarmInput } from "./../../../interfaces/farm";
import axiosInstance from "../../../config/axios_config";
import { AppDispatch } from "../../store";
import {
  creatingFarm,
  creatingFarmFail,
  creatingFarmSuccess,
  fetch,
  fetchFarmFail,
  fetchFarmSuccess,
  fetchingFarmActivities,
  fetchingFarmActivitiesFail,
  fetchingFarmActivitiesSuccess,
} from "./farm_reducer";

// Fetching list of farms
export const getFarms = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.get("/farms");
      dispatch(
        fetchFarmSuccess({
          data: res?.data?.result?.data,
          paginationData: {
            lastPage: res?.data?.result?.lastPage,
            page: res?.data?.result?.page,
            size: res?.data?.result?.size,
            total: res?.data?.result?.total,
          },
        })
      );
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          fetchFarmFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchFarmFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};

// Fetch farm activities for calendar
export const fetchFarmActivitiesAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchingFarmActivities());
      const res = await axiosInstance.get("/farm-activities");
      dispatch(
        fetchingFarmActivitiesSuccess({
          data: res.data.result?.farm_activities,
        })
      );
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          fetchingFarmActivitiesFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchingFarmActivitiesFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};

// Creating  a farm
export const createFarm = (data: CreateFarmInput) => {
  return async (dispatch: AppDispatch) => {
    dispatch(creatingFarm());
    try {
      const res = await axiosInstance.post("/farms", data);      
      dispatch(
        creatingFarmSuccess({
          data: res?.data?.farm,
          message: `Created ${data.name} farm  successfully`,
        })
      );
    } catch (error: any) {
      console.error("err ", error);
      if (error?.message === "Network Error") {
        dispatch(
          creatingFarmFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          creatingFarmFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};
