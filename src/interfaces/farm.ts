export interface PaginationData {
  lastPage: number;
  page: number;
  size: number;
  total: number;
}

export interface FarmState {
  fetching: boolean;
  error: string | any;
  farmActivitiesError: string | any;
  farmData: [] | any;
  farmActivities: [] | any;
  paginationData: PaginationData | any;
  fetchingFarmActivities: boolean;
  creatingFarm: boolean;
  creatingFarmError: string | any;
  creatingFarmMessage: string | any;
  fetchingCategoryActivities: boolean;
  categoryActivities: {} | any;
  categoryActivitiesError: string | any;
  recordingActivity: boolean;
  recordActivityError: string | any;
  recordActivityMessage: string | any;
}

export interface CreateFarmInput {
  name: string;
  size: string | any;
  size_unit: string;
  location: string;
  location_type: string;
  ownership: "owned" | "rented";
  coordinates: [] | any;
  country_id: number;
  state_id: number;
  lga_id: number;
  crop_id: number;
}

export interface RecordActivityInput {
  farm_id: number;
  farm_activity_id: number;
  category_id: number;
  crop_id: number;
  start_date: string | any;
  end_date: string | any;
  type?: string;
  activity?: string;
  amount?: number;
  note?: string;
}

export interface Crop {
  id: number;
  name: string;
}

export interface State {
  id: number;
  name: string;
}

export interface LocalGovt {
  id: number;
  name: string;
}

export interface Crops {
  id: number;
  farm_id: number;
  crop_id: number;
  deleted_at?: string;
  updated_at?: string;
  created_at: string;
  crop?: Crop;
}

export interface Farm {
  id: number;
  account_id: number;
  name: string;
  user_id: number;
  size: number;
  size_unit: string;
  local_govt_id: number;
  state_id: number;
  country_id: number;
  location_type: string;
  location: string;
  coodinates?: [];
  ownership: string;
  deleted_at?: string;
  updated_at?: string;
  created_at: string;
  crops?: Crops[];
  state?: State;
  local_govt: LocalGovt;
}
