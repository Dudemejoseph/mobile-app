import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../components/Wrapper";
import { EDIT_PROFILE_SCREEN } from "../constants/routeNames";
import { COLORS } from "../constants/theme";
import { logoutUser, userSelector, getUser } from "../redux/features/userSlice";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  
  const {
    loading,
    users,
  } = useSelector(userSelector);

  const getUserProcess = async () => {
    try {
      const res = await AsyncStorage.getItem("@userData");
      const serialized = JSON.parse(res);
      // setUser(serialized?.userData);
      await dispatch(getUser(serialized?.userData.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let unmounted = false;

    setTimeout(() => {
      if (!unmounted) {
        getUserProcess();
      }
    }, 3000);

    return () => {
      unmounted = true;
    };
  }, []);

  const logout = () => {
    dispatch(logoutUser());
  };

  console.log(users);
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../assets/icons/back-arrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headText}>Profile</Text>
        <View style={styles.card}>
          <View style={styles.col1}>
            <Image
              style={styles.avatar}
              source={require("../assets/icons/user-profile.png")}
            />
            <TouchableOpacity
              style={styles.editBtn}
              activeOpacity={0.5}
              onPress={() => navigation.navigate(EDIT_PROFILE_SCREEN)}
            >
              <Text style={styles.editTxt}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col2}>
            <Text style={styles.name}>
              {users?.firstname} {users?.lastname}
            </Text>
            <View style={styles.col2Row}>
              <Text style={styles.txt1}>Email</Text>
              <Text style={styles.txt2}>{users?.email}</Text>
            </View>
            <View style={styles.col2Row}>
              <Text style={styles.txt1}>Date Joined</Text>
              <Text style={styles.txt2}>{users?.updated_at.substr(0, 10)}</Text>
            </View>
            <View style={styles.col2Row}>
              <Text style={styles.txt1}>Phone Number</Text>
              <Text style={styles.txt2}>{users?.phone || "-"}</Text>
            </View>
            <View style={styles.col2Row}>
              <Text style={styles.txt1}>Address</Text>
              <Text style={styles.txt2}>{users?.address || "-"}</Text>
            </View>
          </View>
        </View>
        <View style={styles.logoutView}>
          <TouchableOpacity
            style={styles.logoutBtn}
            activeOpacity={0.4}
            onPress={logout}
          >
            <Text style={styles.logoutTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Profile;

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
  backIcon: {
    width: "24@ms",
    height: "24@ms",
    resizeMode: "contain",
  },
  headText: {
    fontSize: "18@ms",
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    marginTop: "30@vs",
  },
  card: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: "20@vs",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    backgroundColor: COLORS.background,
    borderRadius: "8@ms",
    padding: "20@ms",
  },
  avatar: {
    width: "80@ms",
    height: "80@ms",
  },
  editBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "12@ms",
    paddingVertical: "8@ms",
    marginTop: "10@vs",
    width: "80@ms",
  },
  editTxt: {
    color: COLORS.primary,
    fontSize: "10@ms",
  },
  col1: {
    width: "40%",
    justifyContent: "center",
    fontFamily: "Poppins-Regular",
  },
  col2: {
    width: "58%",
  },
  name: {
    fontSize: "20@ms",
    fontFamily: "Poppins-Regular",
  },
  col2Row: {
    marginTop: "10@vs",
  },
  txt1: {
    fontSize: "10@ms",
    color: "#79838B",
    fontFamily: "Poppins-Regular",
  },
  txt2: {
    fontFamily: "Poppins-Regular",
  },
  logoutView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoutBtn: {
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "12@ms",
    paddingVertical: "8@ms",
    marginTop: "20@vs",
    width: "80@ms",
    backgroundColor: COLORS.red,
  },
  logoutTxt: {
    color: COLORS.background,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
  },
});
