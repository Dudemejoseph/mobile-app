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
} = farmSlice.actions;
export const farmSelector = (state: RootState) => state.farm;
export default farmSlice.reducer;
