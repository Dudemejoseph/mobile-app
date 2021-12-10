import { ColorSchemeName, StyleSheet } from "react-native";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";

const styles = (scheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        scheme === "dark"
          ? combinedDarkTheme.colors.background
          : combinedDefaultTheme.colors.background,
    },
  });

export default styles;
