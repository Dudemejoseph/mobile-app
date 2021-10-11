import { useTheme } from "@react-navigation/native";
import React from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "../../../../assets/svgs/logout.svg";
import LogoutIconAlt from "../../../../assets/svgs/logout_alt.svg";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../../constants/theme";
import { DialogState } from "../../../../interfaces/dialog";
import { setLogoutDialogInvisible } from "../../../../redux/features/dialogs/dialogs_actions";
import { dialogSelector } from "../../../../redux/features/dialogs/dialogs_reducer";
import styles from "./styles";

const LogoutDialog = () => {
  const dispatch = useDispatch();
  const { dark } = useTheme();
  const { action, logoutVisible, title } = useSelector(
    dialogSelector
  ) as DialogState;

  const onDismiss = () => {
    dispatch(setLogoutDialogInvisible());
  };

  const onAction = () => {
    onDismiss();
    action();
  };

  return (
    <Portal>
      <Dialog
        theme={dark ? combinedDarkTheme : combinedDefaultTheme}
        visible={logoutVisible as boolean}
        onDismiss={onDismiss}
        style={{
          backgroundColor: dark
            ? combinedDarkTheme.colors.background
            : combinedDefaultTheme.colors.card,
        }}
      >
        <Dialog.Title style={styles.logoutText}>{title}</Dialog.Title>
        <Dialog.Content style={styles.content}>
          {dark ? <LogoutIconAlt /> : <LogoutIcon />}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={onDismiss}
            uppercase={false}
            theme={dark ? combinedDarkTheme : combinedDefaultTheme}
          >
            Cancel
          </Button>
          <Button
            onPress={onAction}
            uppercase={false}
            theme={dark ? combinedDarkTheme : combinedDefaultTheme}
          >
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default LogoutDialog;
