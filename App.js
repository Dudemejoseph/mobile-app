import React, { useEffect } from "react";
import AppNavContainer from "./src/navigators";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  useEffect(() => {
    AsyncStorage.setItem("@firstLaunch", "true");
  }, []);

  return (
    <Provider>
      <SafeAreaProvider>
        <AppNavContainer />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </SafeAreaProvider>
    </Provider>
  );
}
