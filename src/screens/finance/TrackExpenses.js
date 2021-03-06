import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../../components/Wrapper";
import { COLORS } from "../../constants/theme";

const data = [
  {
    id: "1",
    activity: "weeding",
    budget: "N700,000.00",
    actual: "N8500,000.00",
  },
  {
    id: "2",
    activity: "Watering",
    budget: "N700,000.00",
    actual: "N8500,000.00",
  },
  {
    id: "3",
    activity: "Rigging",
    budget: "N700,000.00",
    actual: "N8500,000.00",
  },
];

const TrackExpenses = ({ navigation }) => {
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
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/bell-icon.png")}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTxt}>Track Expenses</Text>

        {/* ======= Table View ======== */}
        <View style={styles.tableView}>
          <View style={styles.tableHead}>
            <Text style={styles.headTxt}>Activity</Text>
            <Text style={styles.headTxt}>Budgeted</Text>
            <Text style={styles.headTxt}>Actual</Text>
          </View>

          {/* ========= table Items ======= */}
          {data.map((item) => {
            return (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.rowTxt}>{item.activity}</Text>
                <Text style={styles.rowTxt}>{item.budget}</Text>
                <Text style={styles.rowTxt}>{item.actual}</Text>
              </View>
            );
          })}
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
});
