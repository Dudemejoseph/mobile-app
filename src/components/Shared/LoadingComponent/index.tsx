import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Wave } from "react-native-animated-spinkit";
import LoadingIcon from "../../../assets/svgs/loading.svg";
import LoadingIconAlt from "../../../assets/svgs/loading_alt.svg";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";
import Wrapper from "../Wrapper";
import styles from "./styles";

const LoadingComponent = () => {
  const { colors, dark } = useTheme();

  return (
    <Wrapper>
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
        {dark ? <LoadingIconAlt /> : <LoadingIcon />}
        <Wave style={styles.wave} size={48} color={colors.primary} />
      </View>
    </Wrapper>
  );
};

export default LoadingComponent;
