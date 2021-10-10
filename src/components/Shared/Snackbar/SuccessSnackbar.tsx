import { useTheme } from "@react-navigation/native";
import React from "react";
import { Snackbar } from "react-native-paper";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";

const SuccessSnackbar = (
  visible: boolean,
  setVisible: Function,
  message: string
) => {
  const { dark } = useTheme();

  console.log("vid ", visible);

  return (
    <Snackbar
      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
      style={{
        backgroundColor: dark
          ? combinedDarkTheme.colors.text
          : combinedDefaultTheme.colors.primary,
      }}
      visible={visible}
      duration={1000}
      onDismiss={() => setVisible(false)}
    >
      {message}
    </Snackbar>
  );
};

export default SuccessSnackbar;
