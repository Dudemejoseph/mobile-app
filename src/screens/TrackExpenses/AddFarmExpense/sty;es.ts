import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    paddingHorizontal: 20,
  },
  surface: {
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 8,
  },
  headingView: {
    borderBottomWidth: 0.42,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headingText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "Poppins-Medium",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputView: { paddingHorizontal: 20, paddingVertical: 10 },
  pickerView: { borderWidth: 1, borderRadius: 4 },
  buttonRow: { flexDirection: "row-reverse", justifyContent: "space-between" },
  buttonLabel: { fontFamily: "Poppins-Regular", fontSize: 12, lineHeight: 18 },
  submit: { alignSelf: "flex-end", marginRight: 20, marginVertical: 20 },
});

export default styles;
