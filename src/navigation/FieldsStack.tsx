import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FARM_DETAILS_SCREEN, FIELDS_SCREEN } from "../constants/route_names";
import Fields from "../screens/Fields";
import FarmDetails from "../screens/Fields/FarmDetails";

const FieldsStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={FIELDS_SCREEN} component={Fields} />
      <Stack.Screen name={FARM_DETAILS_SCREEN} component={FarmDetails} />
    </Stack.Navigator>
  );
};

export default FieldsStack;
