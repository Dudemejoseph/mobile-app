import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 42,
    // paddingHorizontal: 15,
    // marginHorizontal: 25,
    borderRadius: 1.71,
    borderWidth: 1,
  },
  inputContainer: { flex: 1 },
  error: { marginHorizontal: 5 },
  iconContainer: {
    borderRadius: 10,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
