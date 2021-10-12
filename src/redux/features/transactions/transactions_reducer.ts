import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { PayloadType } from "./../../../interfaces/shared_components";
import { TransactionsState } from "./../../../interfaces/transactions";

const initialState: TransactionsState = {
  fetching: true,
  addingFinance: false,
  error: null,
  addingFinanceError: null,
  addingFinanceMessage: null,
  expensesData: null,
  financesData: null,
  message: null,
  fetchFarmExpensesError: null,
  fetchFarmExpensesMessage: null,
  fetchingFarmExpenses: true,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    fetchFinances: (state) => {
      state.fetching = true;
      state.error = null;
      state.message = null;
    },
    fetchFinancesSuccess: (state, { payload }: PayloadType) => {
      state.fetching = false;
      state.error = null;
      state.financesData = payload.data;
    },
    fetchFinancesFail: (state, { payload }: PayloadType) => {
      state.fetching = false;
      state.error = payload.error;
      state.message = null;
    },
    addingFinance: (state) => {
      state.addingFinance = true;
      state.addingFinanceError = null;
      state.addingFinanceMessage = null;
    },
    addingFinanceSuccess: (state, { payload }: PayloadType) => {
      state.addingFinance = false;
      state.addingFinanceError = null;
      state.addingFinanceMessage = payload.message;
      state.financesData = [...state.financesData, payload.data];
    },
    addingFinanceFail: (state, { payload }: PayloadType) => {
      state.addingFinance = false;
      state.addingFinanceMessage = null;
      state.addingFinanceError = payload.error;
    },
    fetchingFarmExpenses: (state) => {
      state.fetchingFarmExpenses = true;
      state.fetchFarmExpensesError = null;
      state.fetchFarmExpensesMessage = null;
    },
    fetchingFarmExpensesSuccess: (state, { payload }: PayloadType) => {
      state.fetchingFarmExpenses = true;
      state.fetchFarmExpensesError = null;
      state.fetchFarmExpensesMessage = payload.data;
    },
    fetchingFarmExpensesFail: (state, { payload }: PayloadType) => {
      state.fetchingFarmExpenses = true;
      state.fetchFarmExpensesError = payload.error;
      state.fetchFarmExpensesMessage = null;
    },
  },
});

export const {
  fetchFinances,
  fetchFinancesFail,
  fetchFinancesSuccess,
  addingFinance,
  addingFinanceFail,
  addingFinanceSuccess,
  fetchingFarmExpenses,
  fetchingFarmExpensesFail,
  fetchingFarmExpensesSuccess,
} = transactionSlice.actions;
export default transactionSlice.reducer;
export const transactionsSelector = (state: RootState) => state.transactions;
