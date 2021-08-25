import { configureStore } from "@reduxjs/toolkit";
import farmSlice from "./features/farmSlice";
import userSlice from "./features/userSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    farm: farmSlice,
  },
});
