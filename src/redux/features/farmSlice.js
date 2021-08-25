import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/api";
import ModalFilterPicker from "react-native-modal-filter-picker";

const initialState = {
  loading: false,
  error: null,
  message: null,
  countries: null,
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
  },
});

export const { fetch, fetchFail, setCountries } = farmSlice.actions;
export default farmSlice.reducer;
export const farmSelector = (state) => state.farm;

// ========== Create Farms ==========
export const createFarm = (data) => {
  return async (dispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.post("/farms", data);
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
      dispatch(setCountries(res.data));
    } catch (error) {
      dispatch(fetchFail(error.response.data.message));
      console.log(error);
    }
  };
};
