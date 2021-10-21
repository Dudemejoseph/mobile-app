import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1 },
  detailsView: {},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  row3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
    maxWidth: "80%",
  },
  leftText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    maxWidth: "60%",
  },
  leftText2: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    maxWidth: "60%",
  },
  rightText: { fontSize: 14, fontFamily: "Poppins-Regular", maxWidth: "60%" },
  mapView: { marginTop: 0 },
  map: { height: 400 },
  dialogContent: { alignItems: "flex-start" },
  dialogButton: { flexDirection: "row" },
});

export default styles;
