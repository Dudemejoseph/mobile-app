import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../../components/Wrapper";
import { ACTIVITIES_SCREEN } from "../../constants/routeNames";
import { COLORS } from "../../constants/theme";

const FarmDetails = ({ navigation, route }) => {
  const { item: farm } = route.params;
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

        <Text style={styles.headerTxt}>Farm Details</Text>
        <View style={styles.detailsView}>
          <View style={styles.item}>
            <Text style={styles.title}>Farm Name:</Text>
            <Text style={styles.name}>{farm.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Location:</Text>
            <Text style={styles.name}>{farm.location}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Size:</Text>
            <Text style={styles.name}>
              {farm.size} {farm.size_unit}
            </Text>
          </View>
        </View>
        <View style={styles.ctaView}>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.6}>
            <Text style={styles.editTxt}>Edit Farm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.activityBtn}
            activeOpacity={0.6}
            onPress={() => navigation.navigate(ACTIVITIES_SCREEN)}
          >
            <Text style={styles.activityTxt}>Start Activity</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default FarmDetails;

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
    fontSize: "16@ms",
    fontWeight: "500",
    marginTop: "40@vs",
    fontFamily: "Poppins-Regular",
  },
  detailsView: {
    marginTop: "20@vs",
  },
  item: {
    marginBottom: "20@vs",
  },
  title: {
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
    fontSize: "14@ms",
  },
  name: {
    fontFamily: "Poppins-Regular",
    fontSize: "12@ms",
    fontWeight: "400",
  },
  ctaView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20@vs",
  },
  editBtn: {
    backgroundColor: COLORS.primary,
    width: "50%",
    height: "35@vs",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  activityBtn: {
    width: "50%",
    height: "35@vs",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  editTxt: {
    fontWeight: "500",
    fontSize: "14@ms",
    color: COLORS.background,
  },
  activityTxt: {
    fontWeight: "500",
    fontSize: "14@ms",
  },
});
