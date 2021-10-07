import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SPLASH_SCREEN } from "../constants/route_names";
import SplashScreen from "../screens/AppPreview/Splash";

const SplashStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={SPLASH_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default SplashStack;
