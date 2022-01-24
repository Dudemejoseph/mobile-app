import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  galleryIconContainr: {
    position: "absolute",
    left: 10,
    bottom: 20,
  },
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
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
    // marginBottom: 20,
  },
  captureIcon: {
    width: 50,
    height: 50,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  buttonLabelStyle: { fontSize: 12, fontFamily: "CircularStd-Medium" },
  pickerView: { borderWidth: 1, borderRadius: 4, marginVertical: 10 },
  buttonLabel: { fontFamily: "Poppins-Regular", fontSize: 12, lineHeight: 18 },
});

export default styles;
