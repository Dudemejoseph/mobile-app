import { useTheme } from "@react-navigation/native";
import React from "react";
import { Snackbar } from "react-native-paper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";
import { SuccessToastProps } from "../../../interfaces/shared_components";

const SuccessSnackbar: React.FC<SuccessToastProps> = ({ visible, setVisible, message }) => {
  const { dark } = useTheme();

  return (
    <Snackbar
      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
      style={{
        backgroundColor: dark ? combinedDarkTheme.colors.text : combinedDefaultTheme.colors.primary,
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
