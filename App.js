import React, { useEffect } from "react";
import AppNavContainer from "./src/navigators";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-native-paper";

export default function App() {
  return (
    <Provider>
      <SafeAreaProvider>
        <AppNavContainer />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </SafeAreaProvider>
    </Provider>
  );
}
