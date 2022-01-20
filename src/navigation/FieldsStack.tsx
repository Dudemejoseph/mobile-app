import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CREATE_FARMS_SCREEN, FARM_DETAILS_SCREEN, FIELDS_SCREEN, GEO_FENCING_SCREEN } from "../constants/route_names";
import Fields from "../screens/Fields";
import FarmDetails from "../screens/Fields/FarmDetails";
import CreateFarm from "../screens/Fields/CreateFarm";
import Geofencing from "../screens/Fields/Geofencing";

const FieldsStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}>
      <Stack.Screen name={FIELDS_SCREEN} component={Fields} />
      <Stack.Screen name={FARM_DETAILS_SCREEN} component={FarmDetails} />
      <Stack.Screen name={CREATE_FARMS_SCREEN} component={CreateFarm} />
      <Stack.Screen name={GEO_FENCING_SCREEN} component={Geofencing} />
    </Stack.Navigator>
  );
};

export default FieldsStack;
