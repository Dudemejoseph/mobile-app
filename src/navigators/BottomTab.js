import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform } from "react-native";
import { COLORS } from "../constants/theme";
import Home from "../screens/Home";
import Fields from "../screens/Fields";
import Calender from "../screens/Calender";
import Finance from "../screens/finance/Finance";
import Camera from "../screens/Camera";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
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
        name='Home'
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/home-icon.png")}
              style={{
                tintColor: color,
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Farms'
        component={Fields}
        options={{
          tabBarLabel: "Farms",
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/ecology-icon.png")}
              style={{
                tintColor: color,
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Camera'
        component={Camera}
        options={{
          tabBarLabel: "Camera",
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/camera.png")}
              style={{
                tintColor: color,
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Calender'
        component={Calender}
        options={{
          tabBarLabel: "Crop Calender",
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/calender-icon.png")}
              style={{
                tintColor: color,
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Finance'
        component={Finance}
        options={{
          tabBarLabel: "Finance",
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/finance-icon.png")}
              style={{
                tintColor: color,
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
