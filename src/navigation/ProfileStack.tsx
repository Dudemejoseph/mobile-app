import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { EDIT_PROFILE_SCREEN, PROFILE_SCREEN } from "../constants/route_names";
import EditProfile from "../screens/Profile/EditProfile";
import Profile from "../screens/Profile";

const ProfileStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={PROFILE_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={PROFILE_SCREEN} component={Profile} />
      <Stack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
