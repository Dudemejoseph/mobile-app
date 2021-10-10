import { createSlice } from "@reduxjs/toolkit";
import { FarmState } from "../../../interfaces/farm";
import { RootState } from "../../store";
import { PayloadType } from "./../../../interfaces/shared_components";

const initialState: FarmState = {
  farmData: null,
  paginationData: null,
  error: null,
  fetching: true,
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
  },
});

export const { fetchFarmFail, fetch, fetchFarmSuccess } = farmSlice.actions;
export const farmSelector = (state: RootState) => state.farm;
export default farmSlice.reducer;
