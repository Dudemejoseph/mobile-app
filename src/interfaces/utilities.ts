export interface UtilitiesState {
  fetchingCrops: boolean;
  fetchingCropsError: string | any;
  cropsData: [] | any;
  fetchingCountries: boolean;
  fetchingCountriesError: string | any;
  countriesData: [] | any;
  fetchingStates: boolean;
  fetchingStatesError: string | any;
  statesData: [] | any;
  fetchingLGAS: boolean;
  fetchingLGASError: string | any;
  LGAS: [] | any;
}
