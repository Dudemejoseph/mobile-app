import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  ADD_FINANCE_SCREEN,
  EOP_SCREEN,
  FINANCE_SCREEN,
} from "../constants/route_names";
import Finance from "../screens/Finance";
import AddFinance from "../screens/Finance/AddFinance";
import Eop from "../screens/finance/EOP";

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
      <Stack.Screen name={EOP_SCREEN} component={Eop} />
    </Stack.Navigator>
  );
};

export default FinancesStack;
