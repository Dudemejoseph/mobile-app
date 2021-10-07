import { createBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { Image } from "react-native";
import { COLORS } from "../constants/theme";
import Calender from "../screens/Calender";
import Camera from "../screens/Camera";
import Fields from "../screens/Fields";
import Finance from "../screens/finance/Finance";
import Home from "../screens/Home";
import styles from "./styles";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          paddingTop: 6,
          borderTopWidth: 0.2,
          borderTopColor: COLORS.border,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/home-icon.png")}
              style={styles(color).imageStyle}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Farms"
        component={Fields}
        options={{
          tabBarLabel: "Farms",
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/ecology-icon.png")}
              style={styles(color).imageStyle}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarLabel: "Camera",
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/camera.png")}
              style={styles(color).imageStyle}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calender"
        component={Calender}
        options={{
          tabBarLabel: "Crop Calender",
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/calender-icon.png")}
              style={styles(color).imageStyle}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Finance"
        component={Finance}
        options={{
          tabBarLabel: "Finance",
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/finance-icon.png")}
              style={styles(color).imageStyle}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
