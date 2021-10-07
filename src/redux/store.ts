import { configureStore } from "@reduxjs/toolkit";
import farmSlice from "./features/farmSlice";
import transactionSlice from "./features/transactionSlice";
import expensesSlice from "./features/expensesSlice";
import userSlice from "./features/user/user_reducer";
import inventorySlice from "./features/inventorySlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    user: userSlice,
    farm: farmSlice,
    transactions: transactionSlice,
    expenses: expensesSlice,
    inventory: inventorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
