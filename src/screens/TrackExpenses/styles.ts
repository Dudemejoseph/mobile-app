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
    lineHeight: 27,
    fontWeight: "500",
  },
  cell: { marginLeft: 10 },
  more: { alignSelf: "center" },
  eopButton: { alignSelf: "flex-end", marginRight: 10, marginVertical: 10 },
  eopText: { fontSize: 12, lineHeight: 14, fontWeight: "400" },
});

export default styles;
