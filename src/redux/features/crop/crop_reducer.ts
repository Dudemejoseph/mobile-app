import { createSlice } from "@reduxjs/toolkit";
import { CropState } from "../../../interfaces/crop";
import { PayloadType } from "../../../interfaces/shared_components";
import { RootState } from "../../store";

const initialState: CropState = {
  cropData: null,
  error: null,
  fetching: true,
  cropActivity: null,
  fetchingDefaultCropActivities: false,
  submitDefaultCropActivitiesError: null,
  submitDefaultCropActivitiesMessage: null,
  submitingDefaultCropActivities: false,
};

export const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {
    fetch: (state) => {
      state.fetching = true;
    },
    fetchDefaultCropActivities: (state) => {
      state.fetchingDefaultCropActivities = true;
    },
    fetchCropSuccess: (state, { payload }: PayloadType) => {
      state.fetching = false;
      state.cropData = payload.data;
      state.error = null;
    },
    fetchCropFail: (state, { payload }: PayloadType) => {
      state.fetching = false;
      state.cropData = null;
      state.error = payload.error;
    },
    fetchDefaultCropActivitiesSuccess: (state, { payload }: PayloadType) => {
      state.fetchingDefaultCropActivities = false;
      state.cropActivity = payload.data;
    },
    fetchDefaultCropActivitiesFailure: (state, { payload }: PayloadType) => {
      state.fetchingDefaultCropActivities = false;
      state.cropActivity = null;
      state.error = payload.error;
    },
    submitingDefaultCropActivities: (state) => {
      state.submitingDefaultCropActivities = true;
      state.submitDefaultCropActivitiesError = null;
      state.submitDefaultCropActivitiesMessage = null;
    },
    submitDefaultCropActivitiesSuccess: (state, { payload }: PayloadType) => {
      state.submitingDefaultCropActivities = false;
      state.submitDefaultCropActivitiesError = null;
      state.submitDefaultCropActivitiesMessage = payload.message;
    },
    submitDefaultCropActivitiesFail: (state, { payload }: PayloadType) => {
      state.submitingDefaultCropActivities = false;
      state.submitDefaultCropActivitiesError = payload.error;
      state.submitDefaultCropActivitiesMessage = null;
    },
  },
});

export const {
  fetchCropFail,
  fetch,
  fetchCropSuccess,
  fetchDefaultCropActivities,
  fetchDefaultCropActivitiesFailure,
  fetchDefaultCropActivitiesSuccess,
  submitDefaultCropActivitiesFail,
  submitDefaultCropActivitiesSuccess,
  submitingDefaultCropActivities,
} = cropSlice.actions;
export const cropSelector = (state: RootState) => state.crop;
export default cropSlice.reducer;
