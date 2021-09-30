import { configureStore } from "@reduxjs/toolkit";
import farmSlice from "./features/farmSlice";
import transactionSlice from "./features/transactionSlice";
import expensesSlice from "./features/expensesSlice";
import userSlice from "./features/userSlice";
import inventorySlice from "./features/inventorySlice";

export default configureStore({
  reducer: {
    user: userSlice,
    farm: farmSlice,
    transactions: transactionSlice,
    expenses: expensesSlice,
    inventory: inventorySlice,
  },
});
