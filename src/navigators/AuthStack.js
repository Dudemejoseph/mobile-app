import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/onboarding/Onboarding";
import {
  AUTH_SCREEN,
  ONBOARDING_SCREEN,
  RESET_PASSWORD_SCREEN,
} from "../constants/routeNames";
import ResetPassword from "../screens/onboarding/ResetPassword";
import Auths from "../screens/onboarding/Auths";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Auth = createStackNavigator();

const AuthRoute = () => {
  const [firstLaunch, setFirstLaunch] = useState(false);

  const getFirstLaunch = async () => {
    const res = await AsyncStorage.getItem("@firstLaunch");
    if (res) {
      setFirstLaunch(true);
    }
  };

  useEffect(() => {
    getFirstLaunch();
  }, []);

  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!firstLaunch && (
        <Auth.Screen name={ONBOARDING_SCREEN} component={Onboarding} />
      )}
      <Auth.Screen name={AUTH_SCREEN} component={Auths} />
      <Auth.Screen name={RESET_PASSWORD_SCREEN} component={ResetPassword} />
    </Auth.Navigator>
  );
};

export default AuthRoute;
