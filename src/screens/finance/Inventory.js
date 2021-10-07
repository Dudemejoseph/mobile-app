import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../../components/Wrapper";
import { ADD_INVENTORY_SCREEN } from "../../constants/route_names";
import { COLORS } from "../../constants/theme";
import {
  fetchInventory,
  inventorySelector,
} from "../../redux/features/inventorySlice";

const inventories = [
  {
    id: "1",
    date: "12/09/2021",
    product: "NPK Bags",
    brand: "NPK brand",
    startingStock: "600g",
    addedStock: "100g",
    usedStock: "50g",
    RemainingStock: "650g",
    variance: "600",
    amountChecked: "500",
    purpose: "Checked for termites",
  },
  {
    id: "2",
    date: "12/09/2021",
    product: "NPK Bags",
    brand: "NPK brand",
    startingStock: "600g",
    addedStock: "100g",
    usedStock: "50g",
    RemainingStock: "650g",
    variance: "600",
    amountChecked: "500",
    purpose: "Checked for termites",
  },
  {
    id: "3",
    date: "12/09/2021",
    product: "NPK Bags",
    brand: "NPK brand",
    startingStock: "600g",
    addedStock: "100g",
    usedStock: "50g",
    RemainingStock: "650g",
    variance: "600",
    amountChecked: "500",
    purpose: "Checked for termites",
  },
];

const Inventory = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInventoryProcess = () => {
      dispatch(fetchInventory());
    };
    fetchInventoryProcess();
  }, []);

  const { inventory } = useSelector(inventorySelector);
  console.log("inventory  ==========> ", inventory);

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
              source={require("../../assets/icons/user-profile.png")}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTxt}>Inventory</Text>

        <ScrollView horizontal>
          <View style={styles.tableView}>
            <View style={styles.tableHead}>
              <Text style={styles.headTxt1}>Date</Text>
              <Text style={styles.headTxt}>Product</Text>
              <Text style={styles.headTxt}>Starting Stock</Text>
              <Text style={styles.headTxt}>Added Stock</Text>
              <Text style={styles.headTxt}>Used Stock</Text>
              <Text style={styles.headTxt}>Remaining Stock</Text>
              <Text style={styles.headTxt}>Variance</Text>
              <Text style={styles.headTxt}>Brand</Text>
              <Text style={styles.headTxt}>Amount Checked Out</Text>
              <Text style={styles.headTxt}>Purpose</Text>
            </View>
            {inventory && inventory.map((item) => {
              return (
                <View style={styles.tableBody} key={item.id}>
                  <Text style={styles.bodyTxt1}>{item.date}</Text>
                  <Text style={styles.bodyTxt}>{item.product}</Text>
                  <Text style={styles.bodyTxt}>{item.brand}</Text>
                  <Text style={styles.bodyTxt}>{item.startingStock}</Text>
                  <Text style={styles.bodyTxt}>{item.addedStock}</Text>
                  <Text style={styles.bodyTxt}>{item.usedStock}</Text>
                  <Text style={styles.bodyTxt}>{item.RemainingStock}</Text>
                  <Text style={styles.bodyTxt}>{item.variance}</Text>
                  <Text style={styles.bodyTxt}>{item.amountChecked}</Text>
                  <Text style={styles.bodyTxt}>{item.purpose}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.add}>
          <TouchableOpacity activeOpacity={0.6} style={styles.exportBtn}>
            <Text style={styles.exportTxt}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.4}
            onPress={() => navigation.navigate(ADD_INVENTORY_SCREEN)}
          >
            <Text style={styles.btnTxt}>Add Inventory</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Inventory;

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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  headTxt: {
    flex: 1,
  },
  headTxt1: {
    flex: 4,
  },

  tableBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bodyTxt: {
    flex: 1,
    marginRight: "10@ms",
    padding: "12@ms",
    fontSize: "10@ms",
  },
  bodyTxt1: {
    flex: 4,
    marginRight: "10@ms",
    padding: "12@ms",
    fontSize: "10@ms",
  },
  add: {
    marginTop: "30@vs",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  btn: {
    backgroundColor: COLORS.primary,
    padding: "12@ms",
    borderRadius: "8@ms",
  },

  btnTxt: {
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
