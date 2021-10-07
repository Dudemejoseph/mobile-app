import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  inputView: {
    marginVertical: 5,
  },
  errorText: { paddingTop: 5, fontFamily: "Poppins-Regular", fontSize: 12 },
  buttonView: { marginVertical: 10 },
  buttonInnerStyle: { paddingVertical: 3 },
  buttonLabelStyle: { fontSize: 12, fontFamily: "Poppins-Regular" },
  infoText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    lineHeight: 18,
    textAlign: "center",
    paddingTop: 10,
  },
  infoSubText: { fontSize: 12, fontFamily: "Poppins-Regular" },
});

export default styles;
