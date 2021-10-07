import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WrapperTypes } from "../../../interfaces/shared_components";
import styles from "./styles";

const Wrapper: React.FC<WrapperTypes> = ({
  children,
  customStyle,
  ...props
}) => {
  const scheme = useColorScheme();

  return (
    <SafeAreaView
      style={customStyle ? customStyle : styles(scheme).container}
      {...props}
    >
      <StatusBar
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
      />
      {children}
    </SafeAreaView>
  );
};

export default Wrapper;
