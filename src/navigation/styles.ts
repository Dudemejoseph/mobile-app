import { StyleSheet } from "react-native";

const styles = (color: any) =>
  StyleSheet.create({
    imageStyle: {
      tintColor: color,
      width: 20,
      height: 20,
      resizeMode: "contain",
    },
    bottomTabStyle: {},
  });

export default styles;
