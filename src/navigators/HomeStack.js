import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import {
  ACTIVITIES_SCREEN,
  CREATE_FARMS_SCREEN,
  EMERGENCY_SCREEN,
  INVENTORY_SCREEN,
  TRACK_EXPENSES_SCREEN,
} from "../constants/routeNames";
import CreateFarms from "../screens/farm/CreateFarms";
import Activities from "../screens/farm/Activities";
import TrackExpenses from "../screens/finance/TrackExpenses";
import Inventory from "../screens/finance/Inventory";
import Emergency from "../screens/Emergency";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Tab' component={BottomTab} />
      <Stack.Screen name={CREATE_FARMS_SCREEN} component={CreateFarms} />
      <Stack.Screen name={ACTIVITIES_SCREEN} component={Activities} />
      <Stack.Screen name={TRACK_EXPENSES_SCREEN} component={TrackExpenses} />
      <Stack.Screen name={INVENTORY_SCREEN} component={Inventory} />
      <Stack.Screen name={EMERGENCY_SCREEN} component={Emergency} />
    </Stack.Navigator>
  );
};

export default HomeStack;
