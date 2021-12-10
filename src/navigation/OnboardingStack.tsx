import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ONBOARDING_SCREEN } from "../constants/route_names";
import OnboardingScreen from "../screens/AppPreview/Onboarding";

const OnboardingStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={ONBOARDING_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ONBOARDING_SCREEN} component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
