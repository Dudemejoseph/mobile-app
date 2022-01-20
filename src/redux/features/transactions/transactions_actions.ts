import axiosInstance from "../../../config/axios_config";
import { AddFarmExpenseInput, AddFinanceInput } from "./../../../interfaces/transactions";
import { AppDispatch } from "./../../store";
import {
  addFarmExpenseFail,
  addFarmExpenseSuccess,
  addingFarmExpense,
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
            error: "Oops!, Network error, please check your internet connection",
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
            error: "Oops!, Network error, please check your internet connection",
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
      dispatch(fetchingFarmExpensesSuccess({ data: res.data.result.expense }));
    } catch (error: any) {
      if (error?.message === "Network Error") {
        dispatch(
          fetchingFarmExpensesFail({
            error: "Oops!, Network error, please check your internet connection",
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

// Adding expense for a farm activity
export const addFarmExpenseAction = (data: AddFarmExpenseInput) => {
  return async (dispatch: AppDispatch) => {
    dispatch(addingFarmExpense());
    try {
      const res = await axiosInstance.post("/farmexpenses", data);
      console.log("res ", res.data);

      dispatch(
        addFarmExpenseSuccess({
          data: res?.data?.activity,
          message: "Added new farm expense successfully",
        })
      );
    } catch (error: any) {
      console.log("err ", error.message);

      if (error?.message === "Network Error") {
        dispatch(
          addFarmExpenseFail({
            error: "Oops!, Network error, please check your internet connection",
          })
        );
      } else {
        dispatch(
          addFarmExpenseFail({
            error: "Oops!, something went wrong.",
          })
        );
      }
    }
  };
};
