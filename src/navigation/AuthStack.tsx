import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AUTH_SCREEN } from "../constants/route_names";
import AuthScreen from "../screens/Auth";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={AUTH_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AUTH_SCREEN} component={AuthScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
