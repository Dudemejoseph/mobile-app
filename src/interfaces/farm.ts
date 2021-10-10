export interface PaginationData {
  lastPage: number;
  page: number;
  size: number;
  total: number;
}

export interface FarmState {
  fetching: boolean;
  error: string | any;
  farmData: [] | any;
  paginationData: PaginationData | any;
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
