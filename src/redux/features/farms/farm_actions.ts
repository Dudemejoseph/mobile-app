import axiosInstance from "../../../config/axios_config";
import { AppDispatch } from "../../store";
import { fetch, fetchFarmFail, fetchFarmSuccess } from "./farm_reducer";

// Fetching listy of farms
export const getFarms = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.get("/farms");
      dispatch(
        fetchFarmSuccess({
          data: res?.data?.result?.data,
          paginationData: {
            lastPage: res?.data?.result?.lastPage,
            page: res?.data?.result?.page,
            size: res?.data?.result?.size,
            total: res?.data?.result?.total,
          },
        })
      );
    } catch (error: any) {
      console.error("err ", error);
      if (error?.message === "Network Error") {
        dispatch(
          fetchFarmFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchFarmFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};
