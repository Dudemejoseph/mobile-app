import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Paragraph } from "react-native-paper";
import EmptyIcon from "../../../assets/svgs/empty.svg";
import EmptyIconAlt from "../../../assets/svgs/empty_alt.svg";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";
import styles from "./styles";

const EmptyList = (text: string) => {
  const { dark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: dark
            ? combinedDarkTheme.colors.background
            : combinedDefaultTheme.colors.card,
        },
      ]}
    >
      {dark ? <EmptyIconAlt /> : <EmptyIcon />}
      <Paragraph style={styles.infoText}>
        Oops! No {text} found at this time
      </Paragraph>
    </View>
  );
};

export default EmptyList;
