import React from "react";
import { CustomTextInputProps } from "../../../interfaces/shared_components";
import { useColorScheme, View, Text } from "react-native";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";

const CustomTextInput: React.FC<CustomTextInputProps> = ({ touched, error, ...props }) => {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const color = !touched
    ? colors.primary
    : error
    ? scheme === "dark"
      ? combinedDarkTheme.colors.error
      : combinedDefaultTheme.colors.error
    : colors.primary;

  return (
    <View style={[styles.container, { borderColor: color, ...props }]}>
      <View style={styles.inputContainer}>
        <TextInput {...(props as any)} />
      </View>
      {touched && error && <Text style={[styles.error, { color }]}>{error}</Text>}
      {/* {touched && (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: !error ? colors.primary : "red" },
          ]}
        >
          <Icon
            size={16}
            name={!error ? "check" : "x"}
            color={scheme === "dark" ? colors.background : "white"}
          />
        </View>
      )} */}
    </View>
  );
};

export default CustomTextInput;
