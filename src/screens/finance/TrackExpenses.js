import React, { useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../components/Wrapper";
import { ADD_EXPENSE_SCREEN } from "../../constants/routeNames";
import { COLORS } from "../../constants/theme";
import { PROFILE_SCREEN } from "../../constants/routeNames";
import { fetchExpenses } from "../../redux/features/expensesSlice";

const TrackExpenses = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error, expenses } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ========= Header View ========= */}
        <View style={styles.headerView}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../../assets/icons/back-arrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(PROFILE_SCREEN);
            }}
          >
            <Image
              source={require("../../assets/icons/user-profile.png")}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTxt}>Track Expenses</Text>

        {/* ======= Table View ======== */}
        <View style={styles.tableView}>
          <View style={styles.tableHead}>
            <Text style={styles.headTxt}>Expense</Text>
            <Text style={styles.headTxt}>Actual(&#8358;)</Text>
          </View>

          {/* ========= table Items ======= */}
          {expenses && expenses.map((item) => {
            return (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.rowTxt}>{item.activity}</Text>
                <Text style={styles.rowTxt}>{item.amount}</Text>
              </View>
            );
          })}
        </View>

        {/* ====== Add Button ===== */}
        <View style={styles.btnView}>
          <TouchableOpacity activeOpacity={0.6} style={styles.exportBtn}>
            <Text style={styles.exportTxt}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.addBtn}
            onPress={() => navigation.navigate(ADD_EXPENSE_SCREEN)}
          >
            <Text style={styles.addTxt}>Add Expense</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default TrackExpenses;

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
  exportBtn: {
    paddingHorizontal: "20@ms",
    paddingVertical: "10@vs",
    borderRadius: 4,
    marginRight: "10@ms",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  exportTxt: {
    fontSize: "12@ms",
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    color: COLORS.primary,
  },
});
