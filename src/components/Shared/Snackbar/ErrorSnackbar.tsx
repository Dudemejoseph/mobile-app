import { useTheme } from "@react-navigation/native";
import React from "react";
import { Snackbar } from "react-native-paper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";
import { ErrorToastProps } from "../../../interfaces/shared_components";

const ErrorSnackbar: React.FC<ErrorToastProps> = ({ action, error, setVisible, visible }) => {
  const { dark } = useTheme();

  return (
    <Snackbar
      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
      style={{
        backgroundColor: dark ? combinedDarkTheme.colors.error : combinedDefaultTheme.colors.error,
      }}
      visible={visible}
      onDismiss={() => setVisible(false)}
      duration={1000}
      action={{
        label: error?.includes("Invalid credentials") ? "" : error?.includes("Network") ? "Retry" : "",
        onPress: () => {
          if (error?.includes("Network Error")) {
            action();
          }
        },
      }}
    >
      {error}
    </Snackbar>
  );
};

export default ErrorSnackbar;
