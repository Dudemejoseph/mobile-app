import axiosInstance from "../../../config/axios_config";
import { AppDispatch } from "../../store";
import {
  CreateFarmInput,
  RecordActivityInput,
} from "./../../../interfaces/farm";
import {
  creatingFarm,
  creatingFarmFail,
  creatingFarmSuccess,
  fetch,
  fetchCategoryActivitiesFail,
  fetchCategoryActivitiesSuccess,
  fetchFarmFail,
  fetchFarmSuccess,
  fetchingCategoryActivities,
  fetchingFarmActivities,
  fetchingFarmActivitiesFail,
  fetchingFarmActivitiesSuccess,
  recordActivityFail,
  recordActivitySuccess,
  recordingActivity,
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

// Fetching activities for categories of a farm
export const fetchCategoryActivitesAction = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchingCategoryActivities());
    try {
      const res = await axiosInstance.get(`/farm-activities/activities/${id}`);
      dispatch(fetchCategoryActivitiesSuccess({ data: res?.data?.categories }));
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          fetchCategoryActivitiesFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchCategoryActivitiesFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};

// Recording an activity
export const recordActivityAction = (data: RecordActivityInput) => {
  console.log("data. ", data.category_id, data);

  return async (dispatch: AppDispatch) => {
    dispatch(recordingActivity());
    try {
      await axiosInstance.put(`/farm-activites/done/${data.category_id}`, data);
      dispatch(
        recordActivitySuccess({
          message: `Recorded data ${data.activity} successfully`,
        })
      );
    } catch (error: any) {
      console.error("error ", error);
      if (error?.message === "Network Error") {
        dispatch(
          recordActivityFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          recordActivityFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};
