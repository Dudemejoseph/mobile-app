import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthRoute from "./AuthStack";
import HomeStack from "./HomeStack";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const AppNavContainer = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <AuthRoute />
        {/* <HomeStack /> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavContainer;
