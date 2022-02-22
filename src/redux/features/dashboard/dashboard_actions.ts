import axiosInstance from "../../../config/axios_config";
import { AppDispatch } from "../../store";
import { fetch, fetchDashboardFail, fetchDashboardSuccess } from "./dashboard_reducer";

// Fetching Data from dashboard
export const getDashboard = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.get("/dashboard/mobile");
      const data: any = [];
      res?.data?.result?.Data.map(({ percentage, color }: any) => {
        const a = { percentage, color };
        data.push(a);
      });
      dispatch(fetchDashboardSuccess({ data }));
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          fetchDashboardFail({
            error: "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchDashboardFail({
            error: "Oops!, something went wrong while fetching latest data",
          })
        );
      }
    }
  };
};
