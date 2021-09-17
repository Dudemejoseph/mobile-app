import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/api";

const initialState = {
  loading: false,
  error: null,
  message: null,
  countries: null,
  states: null,
  farms: null,
  lga: null,
  farmActivities: null,
};

const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setCountries: (state, { payload }) => {
      state.countries = payload;
      state.loading = false;
    },
    setStates: (state, { payload }) => {
      state.states = payload;
      state.loading = false;
    },
    setLGA: (state, { payload }) => {
      state.lga = payload;
      state.loading = false;
    },
    setFarms: (state, {payload}) => {
      state.loading = false;
      state.farms = payload;
    },
    createFarmSuccess: (state) => {
      state.loading = false;
      state.message = 'Farm created successfully';
      state.error = null;
    },
    setFarmActivities: (state, {payload}) => {
      state.loading = false;
      state.farmActivities = payload;
    },
  },
});

export const { fetch, fetchFail, setCountries, setStates, setLGA, createFarmSuccess, setFarms, setFarmActivities } =
  farmSlice.actions;
export default farmSlice.reducer;
export const farmSelector = (state) => state.farm;

// ========== Create Farms ==========
export const createFarm = (data) => {
  return async (dispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.post("/farms", data);
      dispatch(createFarmSuccess());
    } catch (error) {
      dispatch(fetchFail(error.response.data.message));
    }
  };
};

// ========= Fetch Countries =========
export const fetchCountries = () => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.get("/utility/countries");
      dispatch(setCountries(res.data.countries));
    } catch (error) {
      dispatch(fetchFail(error.response.data.message));
    }
  };
};

// ========= Fetch States =========
export const fetchStates = () => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.get("/utility/states/161");
      dispatch(setStates(res.data.states));
    } catch (error) {
      dispatch(fetchFail(error.response.data.message));
    }
  };
};

// ========= Fetch Farms =========
export const fetchFarms = () => {
  return async (dispatch) => {
    try {
      dispatch(fetch());
      const res = await axiosInstance.get("/farms");
      dispatch(setFarms(res.data));
    } catch (error) {
      dispatch(fetchFail(error.response.data.message));
    }
  };
};

// Fetch farm calendars
export const fetchFarmActivitiesAction = () => {
  return async (dispatch) => {
    try {
      dispatch(fetch());
      const res = await axiosInstance.get("/farm-activities");
      dispatch(setFarmActivities(res.data.result?.farm_activities));
    } catch (error) {
      dispatch(fetchFail(error.message))
    }
  };
};