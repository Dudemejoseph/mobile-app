import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1 },
  welcomeText: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    paddingHorizontal: 20,
    paddingVertical: 10,
    lineHeight: 27,
    fontWeight: "500",
  },
  badgeView: { position: "relative", marginBottom: 10 },
  badge: { position: "absolute", bottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  left: { alignItems: "center" },
  name: {
    textTransform: "capitalize",
    fontFamily: "Poppins-Regular",
    lineHeight: 45,
    fontSize: 30,
  },
  infoItems: { marginVertical: 2 },
  upText: {
    fontSize: 9,
    lineHeight: 13,
    textTransform: "capitalize",
    fontFamily: "Poppins-Regular",
  },
  bottomText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textTransform: "capitalize",
    maxWidth: "80%",
  },
  bottomText2: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textTransform: "lowercase",
    maxWidth: "90%",
  },
  bioView: { paddingHorizontal: 20 },
  bioText: {
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: "Poppins-Regular",
    lineHeight: 21,
  },
  bioInfo: {
    textTransform: "capitalize",
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "Poppins-Regular",
  },
});

export default styles;
