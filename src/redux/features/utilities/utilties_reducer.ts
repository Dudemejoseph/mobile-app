import { PayloadType } from "./../../../interfaces/shared_components";
import { createSlice } from "@reduxjs/toolkit";
import { UtilitiesState } from "../../../interfaces/utilities";
import { RootState } from "../../store";

const initialState: UtilitiesState = {
  fetchingCountries: true,
  fetchingCrops: true,
  fetchingStates: true,
  LGAS: null,
  countriesData: null,
  cropsData: null,
  fetchingCountriesError: null,
  fetchingCropsError: null,
  fetchingLGAS: true,
  fetchingLGASError: null,
  fetchingStatesError: null,
  statesData: null,
};

const utilitiesSlice = createSlice({
  name: "utilities",
  initialState,
  reducers: {
    fetchingCrops: (state) => {
      state.fetchingCrops = true;
      state.fetchingCropsError = null;
    },
    fetchCropsSuccess: (state, { payload }: PayloadType) => {
      state.fetchingCrops = false;
      state.fetchingCropsError = null;
      state.cropsData = payload.data;
    },
    fetchCropsFail: (state, { payload }: PayloadType) => {
      state.fetchingCrops = false;
      state.fetchingCropsError = payload.error;
    },
    fetchingCountries: (state) => {
      state.fetchingCountries = true;
      state.fetchingCountriesError = null;
    },
    fetchCountriesSuccess: (state, { payload }: PayloadType) => {
      state.fetchingCountries = false;
      state.fetchingCountriesError = null;
      state.countriesData = payload.data;
    },
    fetchCountriesFail: (state, { payload }: PayloadType) => {
      state.fetchingCountries = false;
      state.fetchingCountriesError = payload.error;
    },
    fetchingStates: (state) => {
      state.fetchingStates = true;
      state.fetchingStatesError = null;
    },
    fetchStatesSuccess: (state, { payload }: PayloadType) => {
      state.fetchingStates = false;
      state.fetchingStatesError = null;
      state.statesData = payload.data;
    },
    fetchStatesFail: (state, { payload }: PayloadType) => {
      state.fetchingStates = false;
      state.fetchingStatesError = payload.error;
    },
    fetchingLGAS: (state) => {
      state.fetchingLGAS = true;
      state.fetchingLGASError = null;
    },
    fetchLGASSuccess: (state, { payload }: PayloadType) => {
      state.fetchingLGAS = false;
      state.fetchingLGASError = null;
      state.LGAS = payload.data;
    },
    fetchLGASFail: (state, { payload }: PayloadType) => {
      state.fetchingLGAS = false;
      state.fetchingLGASError = payload.error;
    },
  },
});

export const {
  fetchCountriesFail,
  fetchCountriesSuccess,
  fetchCropsFail,
  fetchCropsSuccess,
  fetchLGASFail,
  fetchLGASSuccess,
  fetchStatesFail,
  fetchStatesSuccess,
  fetchingCountries,
  fetchingCrops,
  fetchingLGAS,
  fetchingStates,
} = utilitiesSlice.actions;
export default utilitiesSlice.reducer;
export const utlitiesSelector = (state: RootState) => state.utilities;
