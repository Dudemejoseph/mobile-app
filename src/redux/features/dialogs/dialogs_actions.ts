import { AppDispatch } from "../../store";
import { hideLogoutDialog, showLogoutDialog } from "./dialogs_reducer";

// Setting logout dialog open
export const setLogoutDialogVisible = (action: Function) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      showLogoutDialog({
        message: "Are you sure you want to logout?",
        action,
      })
    );
  };
};

// Setting logout dialog close
export const setLogoutDialogInvisible = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(hideLogoutDialog());
  };
};
