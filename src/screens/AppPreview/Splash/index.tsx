import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Wave } from "react-native-animated-spinkit";
import { Title } from "react-native-paper";
import Wrapper from "../../../components/Shared/Wrapper";
import styles from "./styles";

const SplashScreen = () => {
  const { colors } = useTheme();

  return (
    <Wrapper>
      <View style={styles.container}>
        <Title>Logo to be placed here</Title>
        <Wave style={styles.wave} size={48} color={colors.primary} />
      </View>
    </Wrapper>
  );
};

export default SplashScreen;
