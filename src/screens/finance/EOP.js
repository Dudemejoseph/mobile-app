import React, { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import Wrapper from "../../components/Shared/Wrapper";
import { COLORS } from "../../constants/theme";
import { fetchExpenses } from "../../redux/features/transactions/transactions_actions";

const data = [
  {
    id: "1",
    name: "weeding",
    expense: "N70,000.00",
    estimate: "N50,000.00",
    actual: "N50,000.00",
  },
  {
    id: "2",
    name: "weeding",
    expense: "N70,000.00",
    estimate: "N50,000.00",
    actual: "N50,000.00",
  },
  {
    id: "3",
    name: "weeding",
    expense: "N70,000.00",
    estimate: "N50,000.00",
    actual: "N50,000.00",
  },
  {
    id: "4",
    name: "weeding",
    expense: "N70,000.00",
    estimate: "N50,000.00",
    actual: "N50,000.00",
  },
];

const Eop = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchExpensesProcess = () => {
      dispatch(fetchExpenses());
    };
    fetchExpensesProcess();
  }, [dispatch]);

  return (
    <Wrapper customStyle={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ========= Header View ========= */}
        <View style={styles.headerView}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
            <Image source={require("../../assets/icons/back-arrow.png")} style={styles.backIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../../assets/icons/bell-icon.png")} style={styles.bellIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.eopTxt}>EOP</Text>

        {/* ======= Table View ======== */}
        <View style={styles.tableView}>
          <View style={styles.tableHead}>
            <Text style={styles.headTxt}>Crop Name</Text>
            <Text style={styles.headTxt}>Expense</Text>
            <Text style={styles.headTxt}>Estimate</Text>
            <Text style={styles.headTxt}>Actual</Text>
          </View>

          {/* ========= table Items ======= */}
          {data.map((item) => {
            return (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.rowTxt}>{item.name}</Text>
                <Text style={styles.rowTxt}>{item.expense}</Text>
                <Text style={styles.rowTxt}>{item.estimate}</Text>
                <Text style={styles.rowTxt}>{item.actual}</Text>
              </View>
            );
          })}
        </View>

        {/* ====== Add Button ===== */}
        <View style={styles.btnView}>
          <TouchableOpacity activeOpacity={0.6} style={styles.addBtn}>
            <Text style={styles.addTxt}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Eop;

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.background,
    flex: 1,
  },
  headerView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bellIcon: {
    width: "24@ms",
    height: "24@ms",
    resizeMode: "contain",
  },
  backIcon: {
    width: "24@ms",
    height: "24@ms",
    resizeMode: "contain",
  },

  headerTxt: {
    fontSize: "18@ms",
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    marginTop: "20@vs",
  },
  tableView: {
    borderRadius: 4,
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: "15@vs",
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    padding: "12@ms",
  },
  headTxt: {
    flex: 1,
    fontSize: "12@ms",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowTxt: {
    flex: 1,
    borderWidth: 1,
    padding: "10@ms",
    fontSize: "12@ms",
    borderColor: COLORS.border,
  },
  btnView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "50@vs",
  },
  addBtn: {
    paddingHorizontal: "20@ms",
    paddingVertical: "10@vs",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  addTxt: {
    fontSize: "12@ms",
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    color: COLORS.background,
  },
  eopTxt: {
    marginTop: "40@vs",
    fontSize: "18@ms",
    fontWeight: "500",
  },
});
