import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import {
  ACTIVITIES_SCREEN,
  ADD_EXPENSE_SCREEN,
  ADD_FINANCE_SCREEN,
  ADD_INVENTORY_SCREEN,
  CREATE_FARMS_SCREEN,
  EMERGENCY_SCREEN,
  FARM_DETAILS_SCREEN,
  GEO_FENCING_SCREEN,
  INVENTORY_SCREEN,
  SELECT_CROP_SCREEN,
  TRACK_EXPENSES_SCREEN,
} from "../constants/routeNames";
import CreateFarms from "../screens/farm/CreateFarms";
import Activities from "../screens/farm/Activities";
import TrackExpenses from "../screens/finance/TrackExpenses";
import Inventory from "../screens/finance/Inventory";
import Emergency from "../screens/Emergency";
import GeoFence from "../screens/GeoFence";
import SelectCrop from "../screens/farm/SelectCrop";
import AddExpense from "../screens/finance/AddExpense";
import AddFinance from "../screens/finance/AddFinance";
import FarmDetails from "../screens/farm/FarmDetails";
import AddInventory from "../screens/finance/AddInventory";

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
      <Stack.Screen name={GEO_FENCING_SCREEN} component={GeoFence} />
      <Stack.Screen name={SELECT_CROP_SCREEN} component={SelectCrop} />
      <Stack.Screen name={ADD_EXPENSE_SCREEN} component={AddExpense} />
      <Stack.Screen name={ADD_FINANCE_SCREEN} component={AddFinance} />
      <Stack.Screen name={FARM_DETAILS_SCREEN} component={FarmDetails} />
      <Stack.Screen name={ADD_INVENTORY_SCREEN} component={AddInventory} />
    </Stack.Navigator>
  );
};

export default HomeStack;
