import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Button, Paragraph } from "react-native-paper";
import ErrorIcon from "../../../assets/svgs/smtin_went_wrong.svg";
import ErrorIconAlt from "../../../assets/svgs/smtin_went_wrong_alt.svg";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";
import { ErrorComponentProps } from "../../../interfaces/shared_components";
import Wrapper from "../Wrapper";
import styles from "./styles";

const ErrorComponent: React.FC<ErrorComponentProps> = ({ action, error, loading }) => {
  const { dark } = useTheme();
  return (
    <Wrapper>
      <View style={styles.container}>
        {dark ? <ErrorIconAlt /> : <ErrorIcon />}
        <Paragraph style={styles.errorText}>{error}</Paragraph>
        <Button
          theme={dark ? combinedDarkTheme : combinedDefaultTheme}
          mode="contained"
          onPress={() => action()}
          loading={loading}
        >
          Retry
        </Button>
      </View>
    </Wrapper>
  );
};

export default ErrorComponent;
