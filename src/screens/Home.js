import React, { useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import Wrapper from "../components/Wrapper";
import { COLORS } from "../constants/theme";
import Pie from "react-native-pie";
import box1 from "../assets/images/box1.png";
import box2 from "../assets/images/box2.png";
import box3 from "../assets/images/box3.png";
import box4 from "../assets/images/box4.png";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/features/userSlice";
import {
  ACTIVITIES_SCREEN,
  CREATE_FARMS_SCREEN,
  EMERGENCY_SCREEN,
  INVENTORY_SCREEN,
  TRACK_EXPENSES_SCREEN,
} from "../constants/routeNames";

const data = [
  {
    name: "Barley",
    percentage: 30,
    color: "#3C7300",
  },
  {
    name: "Malt",
    percentage: 20,
    color: "#FFD6D6",
  },
  {
    name: "Maize",
    percentage: 20,
    color: "#EEEEEE",
  },
  {
    name: "Rice",
    percentage: 20,
    color: "#282D58",
  },
  {
    name: "Beans",
    percentage: 10,
    color: "#D9E8FF",
  },
];

const actions = [
  {
    name: "Create Farms",
    image: box1,
    route: CREATE_FARMS_SCREEN,
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
  const { navigate } = navigation;
  const { user, message } = useSelector(userSelector);

  useEffect(() => {
    message &&
      Toast.show({
        type: "success",
        text1: "Success",
        text2: message,
        topOffset: 40,
      });
  }, [message]);

  return (
    <Wrapper style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ========= Header View ========= */}
        <View style={styles.headerView}>
          <TouchableOpacity>
            <Image
              source={require("../assets/icons/bell-icon.png")}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        {/* ========= Head Text ======== */}
        <Text style={styles.headTxt}>Welcome, {user.firstname}</Text>

        {/* ======== Slide View ======== */}
        <View style={styles.slideView}>
          <View style={styles.chartView}>
            <View style={styles.col1}>
              <Text style={styles.col1Txt}>Work Done</Text>
              <Pie
                radius={60}
                innerRadius={45}
                sections={data}
                strokeCap={"butt"}
              />
            </View>
            <View style={styles.col2}>
              {data.map((item) => {
                return (
                  <View key={item.color} style={styles.list}>
                    <View style={styles.row}>
                      <View
                        style={{
                          backgroundColor: item.color,
                          width: 11,
                          height: 11,
                          marginRight: 6,
                        }}
                      />
                      <Text style={styles.chartTxt}>{item.name}</Text>
                    </View>
                    <Text style={styles.chartTxt}>{item.percentage}ha</Text>
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
                onPress={() => navigate(item.route)}
              >
                <ImageBackground
                  source={item.image}
                  resizeMode='contain'
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
});
