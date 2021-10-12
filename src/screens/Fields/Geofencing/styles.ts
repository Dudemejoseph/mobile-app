import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    paddingHorizontal: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  distanceView: {
    top: 10,
    right: 20,
    left: 20,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    flexDirection: "row",
    borderRadius: 6,
    width: "90%",
    height: 50,
    padding: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default styles;
