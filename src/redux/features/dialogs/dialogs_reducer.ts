import { RootState } from "./../../store";
import { PayloadType } from "./../../../interfaces/shared_components";
import { createSlice } from "@reduxjs/toolkit";
import { DialogState } from "./../../../interfaces/dialog";

const initialState: DialogState = {
  action: null,
  title: null,
  logoutVisible: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showLogoutDialog: (state, { payload }: PayloadType) => {
      state.title = payload.message;
      state.logoutVisible = true;
      state.action = payload.action;
    },
    hideLogoutDialog: (state) => {
      state.title = null;
      state.logoutVisible = false;
      state.action = null;
    },
  },
});

export const { showLogoutDialog, hideLogoutDialog } = dialogSlice.actions;
export const dialogSelector = (state: RootState) => state.dialog;
export default dialogSlice.reducer;
