import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ACTIVITIES_SCREEN } from "../constants/route_names";
import Activities from "../screens/Activities";

const ActivitiesStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={ACTIVITIES_SCREEN}
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
      }}
    >
      <Stack.Screen name={ACTIVITIES_SCREEN} component={Activities} />
    </Stack.Navigator>
  );
};

export default ActivitiesStack;
