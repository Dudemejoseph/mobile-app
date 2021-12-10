import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import AppNavContainer from "./src/navigation";
import { store } from "./src/redux/store";

const App = () => {
  useEffect(() => {
    AsyncStorage.setItem("@firstLaunch", "true");
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavContainer />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </PaperProvider>
    </Provider>
  );
};

export default App;
