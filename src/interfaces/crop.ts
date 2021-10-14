import { PaginationData } from "./farm";

export interface Crop {
  id: number;
  name: string;
  crop_type: string;
  deleted_at?: string;
  updated_at?: string;
  created_at: string;
}

export interface CropActivity {
  activity_id: number;
  activity_name: string;
  start_date: string;
  end_date: string;
}

export interface StoreCropActiviyInput {
  crop_activity_id: number;
  note: string;
  farm_id: number;
  crop_id: number;
  start_date: string;
  end_date: string;
}

export interface CropState {
  fetching: boolean;
  error: string | any;
  cropData: Crop[] | any;
  paginationData?: PaginationData | any;
  cropActivity: any;
  fetchingDefaultCropActivities: boolean;
  submitingDefaultCropActivities: boolean;
  submitDefaultCropActivitiesError: string | any;
  submitDefaultCropActivitiesMessage: string | any;
}
