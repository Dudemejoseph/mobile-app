import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthRoute from "./AuthStack";
import HomeStack from "./HomeStack";
import { useSelector, useDispatch } from "react-redux";
import userSlice, {
  persistUser,
  userSelector,
} from "../redux/features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const AppNavContainer = () => {
  // let dispatch = useDispatch();
  // useEffect(() => {
  //   const persistUserProcess = async() => {
  //     await dispatch(persistUser());
  //   };
  //   persistUserProcess();
  // }, [])

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
