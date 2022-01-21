import { useTheme } from "@react-navigation/native";
import React from "react";
import { Snackbar } from "react-native-paper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";
import { InfoToastProps } from "../../../interfaces/shared_components";

const InfoSnackbar: React.FC<InfoToastProps> = ({ info, setVisible, visible }) => {
  const { dark } = useTheme();

  return (
    <Snackbar
      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
      visible={visible}
      duration={1000}
      onDismiss={() => setVisible(false)}
    >
      {info}
    </Snackbar>
  );
};

export default InfoSnackbar;
