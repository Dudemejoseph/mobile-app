import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CAMERA_SCREEN } from "../constants/route_names";
import Camera from "../screens/Camera";

const CameraStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={CAMERA_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={CAMERA_SCREEN} component={Camera} />
    </Stack.Navigator>
  );
};

export default CameraStack;
