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
  },
});

export const {
  fetchCropFail,
  fetch,
  fetchCropSuccess,
  fetchDefaultCropActivities,
  fetchDefaultCropActivitiesFailure,
  fetchDefaultCropActivitiesSuccess,
} = cropSlice.actions;
export const cropSelector = (state: RootState) => state.crop;
export default cropSlice.reducer;