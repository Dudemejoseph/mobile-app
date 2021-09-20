import { configureStore } from "@reduxjs/toolkit";
import farmSlice from "./features/farmSlice";
import transactionSlice from "./features/transactionSlice";
import userSlice from "./features/userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    farm: farmSlice,
    transactions: transactionSlice,
  },
});
