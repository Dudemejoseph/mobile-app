import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  ADD_EXPENSE_SCREEN,
  TRACK_EXPENSES_SCREEN,
} from "../constants/route_names";
import TrackExpenses from "../screens/TrackExpenses";
import AddFarmExpense from "../screens/TrackExpenses/AddFarmExpense";

const TrackExpensesStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={TRACK_EXPENSES_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={TRACK_EXPENSES_SCREEN} component={TrackExpenses} />
      <Stack.Screen name={ADD_EXPENSE_SCREEN} component={AddFarmExpense} />
    </Stack.Navigator>
  );
};

export default TrackExpensesStack;
