import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Modal, Portal } from "react-native-paper";
import Toast from "react-native-toast-message";
import Wrapper from "../components/Wrapper";
import { COLORS } from "../constants/theme";
import Pie from "react-native-pie";
import box1 from "../assets/images/box1.png";
import box2 from "../assets/images/box2.png";
import box3 from "../assets/images/box3.png";
import box4 from "../assets/images/box4.png";
import { useSelector, useDispatch } from "react-redux";
import { getDashboard, userSelector } from "../redux/features/userSlice";
import {
  ACTIVITIES_SCREEN,
  CREATE_FARMS_SCREEN,
  EMERGENCY_SCREEN,
  GEO_FENCING_SCREEN,
  INVENTORY_SCREEN,
  PROFILE_SCREEN,
  TRACK_EXPENSES_SCREEN,
} from "../constants/routeNames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFarms } from "../redux/features/farmSlice";

const actions = [
  {
    name: "Create Farms",
    image: box1,
    route: GEO_FENCING_SCREEN,
  },
  {
    name: "Activities",
    image: box2,
    route: ACTIVITIES_SCREEN,
  },
  {
    name: "Track Expense",
    image: box3,
    route: TRACK_EXPENSES_SCREEN,
  },
  {
    name: "Inventory",
    image: box4,
    route: INVENTORY_SCREEN,
  },
];

const Home = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [user, setUser] = useState(null);

  const { navigate } = navigation;
  const dispatch = useDispatch();
  const { message, error, loading, dashboard } = useSelector(userSelector);
  console.log("dashboard ios  ", dashboard);

  const getUser = async () => {
    try {
      const res = await AsyncStorage.getItem("@userData");
      const serialized = JSON.parse(res);
      setUser(serialized);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let unmounted = false;

    setTimeout(() => {
      if (!unmounted) {
        getUser();
      }
    }, 3000);

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    message &&
      Toast.show({
        type: "success",
        text1: "Success",
        text2: message,
        topOffset: 40,
      });
  }, [message]);

  useEffect(() => {
    error &&
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
        topOffset: 40,
      });
  }, [error]);

  // ========= Fetch Dashboard ==========
  useEffect(() => {
    dispatch(getDashboard());
    dispatch(fetchFarms());
  }, [dispatch]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 5,
  };

  console.log(user);

  if (loading) {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Wrapper style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ========= Header View ========= */}
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.navigate(PROFILE_SCREEN)}>
            <Image
              source={require("../assets/icons/user-profile.png")}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        {/* ========= Head Text ======== */}
        <Text style={styles.headTxt}>Welcome, {user?.userData?.firstname}</Text>

        {/* ======== Slide View ======== */}
        <View style={styles.slideView}>
          <View style={styles.chartView}>
            <View style={styles.col1}>
              <Text style={styles.col1Txt}>Work Done</Text>
              {dashboard && (
                <Pie
                  radius={60}
                  innerRadius={45}
                  sections={dashboard}
                  strokeCap={"butt"}
                />
              )}
            </View>
            <View style={styles.col2}>
              {dashboard &&
                dashboard.map((item) => {
                  return (
                    <View key={item.color} style={styles.list}>
                      <View style={styles.row}>
                        <View
                          style={{
                            backgroundColor: `#${item?.color}`,
                            width: 11,
                            height: 11,
                            marginRight: 6,
                          }}
                        />
                        <Text style={styles.chartTxt}>{item?.crop}</Text>
                      </View>
                      <Text style={styles.chartTxt}>{item?.size}ha</Text>
                    </View>
                  );
                })}
            </View>
          </View>
        </View>

        {/* ========== */}
        <View style={styles.boxView}>
          {actions.map((item) => {
            return (
              <TouchableOpacity
                key={item.name}
                activeOpacity={0.6}
                onPress={() => {
                  if (item.name === "Create Farms") {
                    showModal();
                  } else {
                    navigate(item.route);
                  }
                }}
              >
                <ImageBackground
                  source={item.image}
                  resizeMode="contain"
                  style={styles.box}
                >
                  <Text style={styles.boxTxt}>{item.name}</Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ============= */}
        <View style={styles.ctaView}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.6}>
            <Image
              source={require("../assets/icons/report-icon.png")}
              style={styles.btnIcon}
            />
            <Text style={styles.btnTxt}>Generate Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn2}
            activeOpacity={0.6}
            onPress={() => navigate(EMERGENCY_SCREEN)}
          >
            <Image
              source={require("../assets/icons/emergency-icon.png")}
              style={styles.btnIcon}
            />
            <Text style={styles.btnTxt2}>Emergency</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.enter1}
            onPress={() => {
              navigation.navigate(CREATE_FARMS_SCREEN);
              hideModal();
            }}
          >
            <Text style={styles.enterTxt}>Create Farm</Text>
            <Image
              source={require("../assets/icons/arrow-right.png")}
              style={styles.enterIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.enter}
            onPress={() => {
              navigation.navigate(GEO_FENCING_SCREEN);
              hideModal();
            }}
          >
            <Text style={styles.enterTxt}>Map Farm</Text>
            <Image
              source={require("../assets/icons/arrow-right.png")}
              style={styles.enterIcon}
            />
          </TouchableOpacity>
        </Modal>
      </Portal>
    </Wrapper>
  );
};

export default Home;

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.surface,
    flex: 1,
  },
  headerView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bellIcon: {
    width: "24@ms",
    height: "24@ms",
    resizeMode: "contain",
  },
  headTxt: {
    fontSize: "18@ms",
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    marginTop: "20@vs",
  },
  chartView: {
    width: "100%",
    backgroundColor: COLORS.background,
    borderRadius: 4,
    marginTop: "20@vs",
    padding: "12@ms",
    borderWidth: 0.5,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col1: {
    width: "48%",
  },
  col2: {
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  col1Txt: {
    fontWeight: "500",
    fontSize: "14@ms",
    fontFamily: "Poppins-Regular",
    marginBottom: "10@vs",
  },
  color: {
    width: "20@ms",
    height: "20@ms",
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10@vs",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  chartTxt: {
    fontSize: "11@ms",
    color: COLORS.text_grey,
    fontFamily: "Poppins-Regular",
  },
  box: {
    width: "140@ms",
    height: "128@ms",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15@vs",
    borderRadius: 10,
  },
  boxView: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "20@vs",
    paddingHorizontal: "12@ms",
    backgroundColor: COLORS.background,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginTop: "30@vs",
  },
  boxTxt: {
    fontSize: "16@ms",
    fontWeight: "500",
    color: COLORS.background,
    fontFamily: "Poppins-Regular",
  },
  ctaView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.background,
    padding: "20@ms",
    marginTop: "20@vs",
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 4,
  },
  btn: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#21D363",
    padding: "10@ms",
    borderRadius: 8,
  },
  btn2: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#FA0000",
    padding: "10@ms",
    borderRadius: 8,
  },
  btnIcon: {
    width: "20@ms",
    height: "20@ms",
    resizeMode: "contain",
    marginRight: "10@ms",
  },
  btnTxt: {
    fontWeight: "500",
    fontSize: "12@ms",
    color: "#21D363",
    fontFamily: "Poppins-Regular",
  },
  btnTxt2: {
    fontWeight: "500",
    fontSize: "12@ms",
    color: "#FA0000",
    fontFamily: "Poppins-Regular",
  },
  enter1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12@ms",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  enter: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12@ms",
  },
  enterIcon: {
    width: "12@ms",
    height: "12@ms",
    resizeMode: "contain",
  },
  enterTxt: {
    fontWeight: "500",
    fontSize: "14@ms",
    fontFamily: "Poppins-Regular",
  },
});
