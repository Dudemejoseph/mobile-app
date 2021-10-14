import { createSlice } from "@reduxjs/toolkit";
import { FarmState } from "../../../interfaces/farm";
import { RootState } from "../../store";
import { PayloadType } from "./../../../interfaces/shared_components";

const initialState: FarmState = {
  farmData: null,
  paginationData: null,
  error: null,
  farmActivitiesError: null,
  fetching: true,
  fetchingFarmActivities: true,
  farmActivities: null,
  creatingFarm: false,
  creatingFarmError: null,
  creatingFarmMessage: null,
  categoryActivities: null,
  fetchingCategoryActivities: false,
  categoryActivitiesError: null,
  recordActivityError: null,
  recordActivityMessage: null,
  recordingActivity: false,
};

export const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    fetch: (state) => {
      state.fetching = true;
    },
    fetchFarmSuccess: (state, { payload }: PayloadType) => {
      state.fetching = false;
      state.farmData = payload.data;
      state.paginationData = payload.paginationData;
      state.error = null;
    },
    fetchFarmFail: (state, { payload }: PayloadType) => {
      state.fetching = false;
      state.farmData = null;
      state.paginationData = null;
      state.error = payload.error;
    },
    fetchingFarmActivities: (state) => {
      state.fetchingFarmActivities = true;
      state.farmActivitiesError = null;
    },
    fetchingFarmActivitiesSuccess: (state, { payload }: PayloadType) => {
      state.fetchingFarmActivities = false;
      state.farmActivities = payload.data;
      state.farmActivitiesError = null;
    },
    fetchingFarmActivitiesFail: (state, { payload }: PayloadType) => {
      state.fetchingFarmActivities = false;
      state.farmActivitiesError = payload.error;
    },
    creatingFarm: (state) => {
      state.creatingFarm = true;
      state.creatingFarmError = null;
      state.creatingFarmMessage = null;
    },
    creatingFarmSuccess: (state, { payload }: PayloadType) => {
      state.creatingFarm = false;
      state.creatingFarmError = null;
      state.creatingFarmMessage = payload.message;
      // state.farmData = [...state.farmData, payload.data];
    },
    creatingFarmFail: (state, { payload }: PayloadType) => {
      state.creatingFarm = false;
      state.creatingFarmError = payload.error;
      state.creatingFarmMessage = null;
    },
    fetchingCategoryActivities: (state) => {
      state.fetchingCategoryActivities = true;
      state.categoryActivitiesError = null;
    },
    fetchCategoryActivitiesSuccess: (state, { payload }: PayloadType) => {
      state.fetchingCategoryActivities = false;
      state.categoryActivities = payload.data;
      state.categoryActivitiesError = null;
    },
    fetchCategoryActivitiesFail: (state, { payload }: PayloadType) => {
      state.fetchingCategoryActivities = false;
      state.categoryActivitiesError = payload.error;
    },
    recordingActivity: (state) => {
      state.recordingActivity = true;
      state.recordActivityError = null;
      state.recordActivityMessage = null;
    },
    recordActivitySuccess: (state, { payload }: PayloadType) => {
      state.recordingActivity = false;
      state.recordActivityError = null;
      state.recordActivityMessage = payload.message;
    },
    recordActivityFail: (state, { payload }: PayloadType) => {
      state.recordingActivity = false;
      state.recordActivityError = payload.error;
      state.recordActivityMessage = null;
    },
  },
});

export const {
  fetchFarmFail,
  fetch,
  fetchFarmSuccess,
  fetchingFarmActivities,
  fetchingFarmActivitiesFail,
  fetchingFarmActivitiesSuccess,
  creatingFarm,
  creatingFarmSuccess,
  creatingFarmFail,
  fetchCategoryActivitiesFail,
  fetchCategoryActivitiesSuccess,
  fetchingCategoryActivities,
  recordActivityFail,
  recordActivitySuccess,
  recordingActivity,
} = farmSlice.actions;
export const farmSelector = (state: RootState) => state.farm;
export default farmSlice.reducer;
