import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  ADD_INVENTORY_SCREEN,
  INVENTORY_SCREEN,
} from "../constants/route_names";
import AddInventory from "../screens/finance/AddInventory";
import Inventory from "../screens/finance/Inventory";

const InventoryStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={INVENTORY_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={INVENTORY_SCREEN} component={Inventory} />
      <Stack.Screen name={ADD_INVENTORY_SCREEN} component={AddInventory} />
    </Stack.Navigator>
  );
};

export default InventoryStack;
