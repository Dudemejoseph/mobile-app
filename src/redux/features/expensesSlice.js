import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/api";

const initialState = {
  loading: false,
  error: null,
  message: null,
  expenses: null,
  states: null,
  lga: null,
};

const expensesSlice = createSlice({
  name: "expenses",
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
    setExpenses: (state, { payload }) => {
      state.expenses = payload;
      state.loading = false;
    },
  },
});

export const { fetch, fetchFail, setExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
export const expensesSelector = (state) => state.expenses;

export const fetchExpenses = () => {
  return async (dispatch) => {
    try {
      dispatch(fetch());
      const res = await axiosInstance.get("/farmexpenses");
      console.log('farm ex ', res.data.result);
      dispatch(setExpenses(res.data.result.data));
    } catch (error) {
      dispatch(fetchFail(error.response.data.message));
      console.error(error)
    }
  };
};

export const createExpense = (data) => {
  return async (dispatch) => {
    try {
      dispatch(fetch());
      const res = await axiosInstance.post("/farmexpenses", data);
      console.log("expense ", res.data.result);
      dispatch(setExpenses(res.data.result.data));
    } catch (error) {
      dispatch(fetchFail(error.response.data.message));
      console.error(error)
    }
  };
};
