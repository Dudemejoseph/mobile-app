import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthRoute from "./AuthStack";
import HomeStack from "./HomeStack";
import { useSelector } from "react-redux";
import userSlice, { userSelector } from "../redux/features/userSlice";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const AppNavContainer = () => {
  const { isAuthenticated } = useSelector(userSelector);
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        {isAuthenticated ? <HomeStack /> : <AuthRoute />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavContainer;
