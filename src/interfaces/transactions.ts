export interface TransactionsState {
  fetching: boolean;
  error: string | any;
  message: null | any;
  financesData: [] | any;
  expensesData: [] | any;
  addingFinance: boolean;
  addingFinanceError: string | any;
  addingFinanceMessage: string | any;
  fetchingFarmExpenses: boolean;
  fetchFarmExpensesMessage: [] | any;
  fetchFarmExpensesError: string | any;
}

export interface Transaction {
  id: number;
  account_id: number;
  user_id: number;
  farm_id: number;
  activity: string;
  type: string;
  amount: string | number;
  note: string;
  created_at: Date | any;
  updated_at: Date | any;
  deleted_at: Date | any;
}

export interface AddFinanceInput {
  activity: string;
  type: string;
  farm_id: number | any;
  amount: number | string;
  note: string;
}
