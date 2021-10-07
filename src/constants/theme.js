import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

export const COLORS = {
  primary: "#52BD95",
  surface: "#F9F9F9",
  background: "#FFFFFF",
  text_grey: "#979797",
  text_dark: "#000000",
  border: "#E8E8E8",
  red: "#F72604",
};

export const combinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: "#52BD95",
    background: "#E5E5E5",
    text: "#2E3851",
    border: "#F3F3F3",
  },
};

export const combinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: "#DEDEDE",
    background: "#121212",
    text: "#52BD95",
    placeholder: "#DEDEDE",
  },
};
