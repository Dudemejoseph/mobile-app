import React, { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, ActivityIndicator } from "react-native";
import AuthRoute from "./AuthStack";
import HomeStack from "./HomeStack";
import { useSelector, useDispatch } from "react-redux";
import userSlice, {
  persistUser,
  userSelector,
} from "../redux/features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/theme";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const AppNavContainer = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useSelector(userSelector);

  const getToken = async () => {
    setLoading(true);
    try {
      const res = await AsyncStorage.getItem("@userToken");
      if (res) setToken(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size='large' color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        {token ? <HomeStack /> : <AuthRoute />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavContainer;
