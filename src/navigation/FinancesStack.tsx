import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  ADD_FINANCE_SCREEN,
  FINANCE_SCREEN,
  TRACK_EXPENSES_SCREEN,
} from "../constants/route_names";
import Finance from "../screens/Finance";
import AddFinance from "../screens/Finance/AddFinance";
import TrackExpenses from "../screens/finance/TrackExpenses";

const FinancesStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={FINANCE_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={FINANCE_SCREEN} component={Finance} />
      <Stack.Screen name={ADD_FINANCE_SCREEN} component={AddFinance} />
      <Stack.Screen name={TRACK_EXPENSES_SCREEN} component={TrackExpenses} />
    </Stack.Navigator>
  );
};

export default FinancesStack;
