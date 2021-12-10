import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1 },
  carouselWrapper: {
    flexDirection: "row",
  },
  dotStyle: {
    color: "red",
  },
  carouselItem: {
    borderRadius: 5,
    paddingHorizontal: 5,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    alignItems: "center",
  },
  subheadingText: {
    fontWeight: "500",
    fontFamily: "CircularStd-Medium",
    lineHeight: 15,
    fontSize: 14,
    marginBottom: 20,
    maxWidth: "60%",
    textAlign: "center",
  },
  pieView: {
    alignItems: "center",
    flexGrow: 1,
  },
  gauge: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeText: {
    position: "absolute",
    backgroundColor: "transparent",
    fontSize: 24,
    fontFamily: "CircularStd-Medium",
  },
  listWrapper: { width: "40%" },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  list2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  row: { flexDirection: "row" },
  chartTxt: {
    marginLeft: 3,
    fontSize: 11,
    fontFamily: "Inter-Regular",
    lineHeight: 13,
  },
  box: {
    height: 20,
    width: 20,
  },
});

export default styles;
