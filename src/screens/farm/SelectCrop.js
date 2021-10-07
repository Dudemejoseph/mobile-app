import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../../components/Wrapper";
import { SELECT_CROP_SCREEN } from "../../constants/route_names";
import { COLORS } from "../../constants/theme";

const farms = [
  {
    id: "1",
    name: "Maize",
  },
  {
    id: "2",
    name: "Plantain",
  },
  {
    id: "3",
    name: "Cassava",
  },
  {
    id: "4",
    name: "Tomatoes",
  },
  {
    id: "5",
    name: "Onions",
  },
];

const SelectCrop = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
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

        <Text style={styles.headerTxt}>Select Crops</Text>

        {/* ======= Log In Activities ========= */}
        <View style={styles.formView}>
          <Text style={styles.headTxt}>Crops</Text>
          <View style={styles.farms}>
            {farms.map((item) => {
              return (
                <View key={item.id} style={styles.field}>
                  <Text style={styles.fieldTxt}>{item.name}</Text>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setShowMenu(!showMenu);
                    }}
                  >
                    <Image
                      source={require("../../assets/icons/menu-icon.png")}
                      style={styles.menuIcon}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
            {showMenu && (
              <View style={styles.menu}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setShowMenu(false);
                  }}
                >
                  <Text style={styles.menuTxt}>Add To Field</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default SelectCrop;

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
  formView: {
    width: "100%",
    marginTop: "20@ms",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  headTxt: {
    fontWeight: "500",
    fontSize: "14@ms",
    fontFamily: "Poppins-Regular",
    padding: "12@ms",
    backgroundColor: COLORS.surface,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  farm: {
    width: "100%",
    padding: "14@ms",
  },
  menuIcon: {
    width: "25@ms",
    height: "25@ms",
    resizeMode: "contain",
  },
  field: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12@ms",
    borderTopWidth: 1,
    borderColor: COLORS.border,
    position: "relative",
  },
  fieldTxt: {
    fontFamily: "Poppins-Regular",
  },
  menuTxt: {
    fontFamily: "Poppins-Regular",
    padding: "10@ms",
  },
  menu: {
    backgroundColor: COLORS.background,
    borderRadius: 6,
    position: "absolute",
    top: "40@vs",
    right: "20@ms",
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
});
