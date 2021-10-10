import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { combinedDarkTheme, combinedDefaultTheme } from "../constants/theme";
import { UserState } from "../interfaces/user";
import { checkOnboarding } from "../redux/features/user/user_actions";
import { userSelector } from "../redux/features/userSlice";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import OnboardingStack from "./OnboardingStack";
import SplashStack from "./SplashStack";

const AppNavContainer = () => {
  const dispatch = useDispatch();
  const scheme = useColorScheme();
  const { isCheckingUser, viewedOnboarding, isAuthenticated } = useSelector(
    userSelector
  ) as UserState;

  useEffect(() => {
    dispatch(checkOnboarding());
  }, [dispatch]);

  return (
    <>
      <NavigationContainer
        theme={scheme === "dark" ? combinedDarkTheme : combinedDefaultTheme}
      >
        {isCheckingUser ? (
          <SplashStack />
        ) : viewedOnboarding && isAuthenticated ? (
          <MainStack />
        ) : viewedOnboarding && !isAuthenticated ? (
          <AuthStack />
        ) : (
          <OnboardingStack />
        )}
      </NavigationContainer>
    </>
  );
};

export default AppNavContainer;
