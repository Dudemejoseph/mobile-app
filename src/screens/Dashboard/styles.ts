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
  enter1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
  },
  containerStyle: {
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  enter: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  enterIcon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },
  enterTxt: {
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  createTxt: {
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
  },
});

export default styles;
