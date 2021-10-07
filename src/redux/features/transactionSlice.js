import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios_config";

const initialState = {
  loading: false,
  error: null,
  message: null,
  finances: null,
  expenses: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    setError: (state, { payload }) => {
      (state.loading = false), (state.error = payload), (state.message = null);
    },
    setMessage: (state, { payload }) => {
      (state.loading = false), (state.error = null), (state.message = payload);
    },
    setFinance: (state, { payload }) => {
      state.loading = false;
      state.finances = payload;
    },
    setExpenses: (state, { payload }) => {
      state.loading = false;
      state.expenses = payload;
    },
    clear: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const { fetch, setError, setMessage, setExpenses, setFinance, clear } =
  transactionSlice.actions;
export default transactionSlice.reducer;
export const transactionsSelector = (state) => state.transactions;

// ========== Create Finance ==========
export const addFinance = (data) => {
  return async (dispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.post("/transactions", data);
      dispatch(setMessage("Finance recorded successfully"));
      dispatch(clear());
    } catch (error) {
      dispatch(setError(error.response.data.message));
    }
  };
};

export const fetchFinances = () => {
  return async (dispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.get("/transactions");
      console.log(res.data.result);
      dispatch(setFinance(res?.data?.result));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      console.log(error);
    }
  };
};
