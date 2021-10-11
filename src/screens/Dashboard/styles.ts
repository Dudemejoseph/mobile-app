import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  middleView: {
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  directoryRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  bottomView: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonView: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  buttonLabel: { fontSize: 14, fontFamily: "Poppins-Medium", lineHeight: 20 },
  buttonLabelStyle: { fontSize: 12, fontFamily: "Poppins-Regular" },
});

export default styles;
