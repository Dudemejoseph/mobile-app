import dialogSlice from "./features/dialogs/dialogs_reducer";
import dashboardSlice from "./features/dashboard/dashboard_reducer";
import { configureStore } from "@reduxjs/toolkit";
// import expensesSlice from "./features/expensesSlice";
import inventorySlice from "./features/inventorySlice";
// import transactionSlice from "./features/transactionSlice";
import userSlice from "./features/user/user_reducer";
import farmSlice from "./features/farms/farm_reducer";
import cropSlice from "./features/crop/crop_reducer";
import transactionSlice from "./features/transactions/transactions_reducer";
import utilitiesSlice from "./features/utilities/utilties_reducer";

export const store = configureStore({
  reducer: {
    user: userSlice,
    farm: farmSlice,
    dashboard: dashboardSlice,
    crop: cropSlice,
    dialog: dialogSlice,
    transactions: transactionSlice,
    utilities: utilitiesSlice,
    // expenses: expensesSlice,
    inventory: inventorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
