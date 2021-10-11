import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  preview: {
    flex: 1,
  },
  capture: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
    marginBottom: 20,
  },
  captureIcon: {
    width: 50,
    height: 50,
  },
});

export default styles;
