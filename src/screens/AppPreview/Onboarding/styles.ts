import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  bottomView: { flex: 0.5, paddingHorizontal: 30 },
  buttonInnerStyle: { paddingVertical: 3 },
  buttonOuterStyle: { borderRadius: 5 },
  buttonLabelStyle: { fontSize: 20, fontFamily: "CircularStd-Medium" },
});

export default styles;
