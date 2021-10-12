import axiosInstance from "../../../config/axios_config";
import { AddFinanceInput } from "./../../../interfaces/transactions";
import { AppDispatch } from "./../../store";
import {
  addingFinance,
  addingFinanceFail,
  addingFinanceSuccess,
  fetchFinances,
  fetchFinancesFail,
  fetchFinancesSuccess,
  fetchingFarmExpenses,
  fetchingFarmExpensesFail,
  fetchingFarmExpensesSuccess,
} from "./transactions_reducer";

export const fetchFinancesAction = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchFinances());
    try {
      const res = await axiosInstance.get("/transactions");
      dispatch(fetchFinancesSuccess({ data: res?.data?.result?.data }));
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          fetchFinancesFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchFinancesFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};

// Adding Finance for a farm activity
export const addFinance = (data: AddFinanceInput) => {
  return async (dispatch: AppDispatch) => {
    dispatch(addingFinance());
    try {
      const res = await axiosInstance.post("/transactions", data);
      dispatch(
        addingFinanceSuccess({
          data: res?.data?.transaction,
          message: `Added new cost of ${data.activity}  successfully`,
        })
      );
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          addingFinanceFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          addingFinanceFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};

export const fetchExpenses = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchingFarmExpenses());
      const res = await axiosInstance.get("/farmexpenses");
      dispatch(fetchingFarmExpensesSuccess(res.data.result.data));
    } catch (error: any) {
      console.error("erro ", error);
      if (error?.message === "Network Error") {
        dispatch(
          fetchingFarmExpensesFail({
            error:
              "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          fetchingFarmExpensesFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};
