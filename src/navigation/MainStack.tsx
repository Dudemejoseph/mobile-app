import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  CALENDAR_TAB,
  DASHBOARD_SCREEN,
  DASHBOARD_TAB,
  DASHBOARD_TAB_SCREEN,
  FIELDS_TAB,
  FINANCE_TAB,
  MEMBERS_TAB,
} from "../constants/route_names";
import { combinedDarkTheme, combinedDefaultTheme } from "../constants/theme";
import Dashboard from "../screens/Dashboard";
import FieldIcon from "../assets/svgs/field.svg";
import MemberIcon from "../assets/svgs/members.svg";
import CalendarIcon from "../assets/svgs/calendar.svg";
import FinanceIcon from "../assets/svgs/finance.svg";

import Entypo from "react-native-vector-icons/Entypo";
Entypo.loadFont();

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
        inactiveColor={
          dark ? colors.text : combinedDefaultTheme.colors.backdrop
        }
      >
        <BottomTab.Screen
          name={DASHBOARD_TAB}
          component={DashboardStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={26} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name={FIELDS_TAB}
          component={DashboardStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FieldIcon stroke={color} strokeWidth={focused ? 0.4 : 0} />
            ),
          }}
        />
        <BottomTab.Screen
          name={MEMBERS_TAB}
          component={DashboardStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MemberIcon stroke={color} strokeWidth={focused ? 0.4 : 0} />
            ),
          }}
        />
        <BottomTab.Screen
          name={CALENDAR_TAB}
          component={DashboardStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <CalendarIcon stroke={color} strokeWidth={focused ? 0.4 : 0} />
            ),
          }}
        />
        <BottomTab.Screen
          name={FINANCE_TAB}
          component={DashboardStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FinanceIcon stroke={color} strokeWidth={focused ? 0.4 : 0} />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName={DASHBOARD_TAB_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={DASHBOARD_TAB_SCREEN} component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default MainStack;
