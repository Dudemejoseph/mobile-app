import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import CalendarIcon from "../assets/svgs/calendar.svg";
import FieldIcon from "../assets/svgs/field.svg";
import FinanceIcon from "../assets/svgs/finance.svg";
import {
  ACTIVITIES_STACK,
  CALENDAR_TAB,
  CAMERA_TAB,
  DASHBOARD_SCREEN,
  DASHBOARD_TAB,
  DASHBOARD_TAB_SCREEN,
  FIELDS_STACK,
  FIELDS_TAB,
  FINANCE_STACK,
  FINANCE_TAB,
  INVENTORY_STACK,
  PROFILE_STACK,
  TRACK_EXPENSES_STACK,
  EMERGENCY_SCREEN,
} from "../constants/route_names";
import { combinedDarkTheme, combinedDefaultTheme } from "../constants/theme";
import Calender from "../screens/Calendar";
import Dashboard from "../screens/Dashboard";
import Emergency from "../screens/Emergency";
import ActivitiesStack from "./ActivitiesStack";
import CameraStack from "./CameraStack";
import FieldsStack from "./FieldsStack";
import FinancesStack from "./FinancesStack";
import InventoryStack from "./InventoryStack";
import ProfileStack from "./ProfileStack";
import TrackExpensesStack from "./TrackExpensesStack";

Entypo.loadFont();
Feather.loadFont();

const MainStack = () => {
  const Stack = createNativeStackNavigator();
  const BottomTab = createMaterialBottomTabNavigator();
  const { colors, dark } = useTheme();

  const DashboardStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={DASHBOARD_SCREEN} component={Dashboard} />
      </Stack.Navigator>
    );
  };

  const BottomTabs = () => {
    return (
      <BottomTab.Navigator
        theme={dark ? combinedDarkTheme : combinedDefaultTheme}
        initialRouteName={DASHBOARD_TAB}
        barStyle={{
          backgroundColor: colors.background,
        }}
        shifting={true}
        activeColor={colors.primary}
        inactiveColor={dark ? colors.text : combinedDefaultTheme.colors.backdrop}
      >
        <BottomTab.Screen
          name={DASHBOARD_TAB}
          component={DashboardStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="home"
                size={26}
                color={
                  focused ? (dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.primary) : "grey"
                }
              />
            ),
          }}
        />
        <BottomTab.Screen
          name={FIELDS_TAB}
          component={FieldsStack}
          options={{
            tabBarIcon: ({ color, focused }) => <FieldIcon stroke={color} strokeWidth={focused ? 0.4 : 0} />,
          }}
        />
        <BottomTab.Screen
          name={CAMERA_TAB}
          component={CameraStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="camera"
                size={22}
                color={
                  focused ? (dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.primary) : "grey"
                }
              />
            ),
          }}
        />
        <BottomTab.Screen
          name={CALENDAR_TAB}
          component={Calender}
          options={{
            tabBarIcon: ({ color, focused }) => <CalendarIcon stroke={color} strokeWidth={focused ? 0.4 : 0} />,
          }}
        />
        <BottomTab.Screen
          name={FINANCE_TAB}
          component={FinancesStack}
          options={{
            tabBarIcon: ({ color, focused }) => <FinanceIcon stroke={color} strokeWidth={focused ? 0.4 : 0} />,
          }}
        />
      </BottomTab.Navigator>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName={DASHBOARD_TAB_SCREEN}
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    >
      <Stack.Screen name={DASHBOARD_TAB_SCREEN} component={BottomTabs} />
      <Stack.Screen name={PROFILE_STACK} component={ProfileStack} />
      <Stack.Screen name={FINANCE_STACK} component={FinancesStack} />
      <Stack.Screen name={TRACK_EXPENSES_STACK} component={TrackExpensesStack} />
      <Stack.Screen name={FIELDS_STACK} component={FieldsStack} />
      <Stack.Screen name={ACTIVITIES_STACK} component={ActivitiesStack} />
      <Stack.Screen name={INVENTORY_STACK} component={InventoryStack} />
      <Stack.Screen name={EMERGENCY_SCREEN} component={Emergency} />
    </Stack.Navigator>
  );
};

export default MainStack;
