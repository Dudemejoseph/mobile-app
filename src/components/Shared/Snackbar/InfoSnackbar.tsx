import { useTheme } from "@react-navigation/native";
import React from "react";
import { Snackbar } from "react-native-paper";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";

const InfoSnackbar = (visible: boolean, setVisible: Function, info: string) => {
  const { dark } = useTheme();

  return (
    <Snackbar
      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
      visible={visible}
      onDismiss={() => setVisible(false)}
    >
      {info}
    </Snackbar>
  );
};

export default InfoSnackbar;
