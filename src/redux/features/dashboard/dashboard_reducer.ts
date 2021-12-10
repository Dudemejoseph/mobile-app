import { createSlice } from "@reduxjs/toolkit";
import { DashboardState } from "../../../interfaces/user";
import { RootState } from "../../store";
import { PayloadType } from "./../../../interfaces/shared_components";

const initialState: DashboardState = {
  dashboardData: null,
  error: null,
  fetching: true,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetch: (state) => {
      state.fetching = true;
    },
    fetchDashboardSuccess: (state, { payload }: PayloadType) => {
      state.fetching = false;
      state.dashboardData = payload.data;
      state.error = null;
    },
    fetchDashboardFail: (state, { payload }: PayloadType) => {
      state.fetching = false;
      state.dashboardData = null;
      state.error = payload.error;
    },
  },
});

export const { fetchDashboardFail, fetch, fetchDashboardSuccess } =
  dashboardSlice.actions;
export const dashboardSelector = (state: RootState) => state.dashboard;
export default dashboardSlice.reducer;
