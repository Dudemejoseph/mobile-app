import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  agendaItemContainer: {
    backgroundColor: "#4d6eff",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  agendaItemContainer2: {
    marginTop: 10,
    backgroundColor: "#fdf1db",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  agendaTimeRangeText: {
    color: "#f2f2f2",
    fontSize: 12,
    fontWeight: "normal",
  },
  agendaActivityText: {
    color: "#f2994a",
    fontSize: 14,
    fontWeight: "bold",
  },
  nextText: { color: "#4D6EFF" },
  durationText: {
    color: "#f2f2f2",
    fontSize: 12,
    fontWeight: "normal",
  },
  content: {
    paddingHorizontal: 0,
  },
  eventItem: { marginRight: 10, marginTop: 17 },
});
