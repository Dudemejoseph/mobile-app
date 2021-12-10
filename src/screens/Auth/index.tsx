import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import Wrapper from "../../components/Shared/Wrapper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../constants/theme";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";
import styles from "./styles";

const AuthScreen = () => {
  return (
    <Wrapper>
      <View style={styles.container}>
        <Title style={styles.titleText}>Welcome to Farm Monitor</Title>
      </View>
      <TopTabs />
    </Wrapper>
  );
};

const TopTabs = () => {
  const { colors, dark } = useTheme();
  const paddingHorizontal = 20;

  return (
    <Tabs
      defaultIndex={1}
      uppercase={false}
      style={{ backgroundColor: colors.background, paddingHorizontal }}
      dark={dark}
      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
      mode="scrollable"
      showLeadingSpace={false}
    >
      <TabScreen label="Register">
        <RegisterScreen />
      </TabScreen>
      <TabScreen label="Login">
        <LoginScreen />
      </TabScreen>
    </Tabs>
  );
};

export default AuthScreen;
