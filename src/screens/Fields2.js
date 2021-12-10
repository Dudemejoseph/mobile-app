import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../components/Wrapper";
import {
  ACTIVITIES_SCREEN,
  FARM_DETAILS_SCREEN,
  GEO_FENCING_SCREEN,
  PROFILE_SCREEN,
  SELECT_CROP_SCREEN,
} from "../constants/route_names";
import { COLORS } from "../constants/theme";
import { farmSelector, fetchFarms } from "../redux/features/farmSlice";

const Fields = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, farms } = useSelector(farmSelector);
  console.log('farms ', farms);

  useEffect(() => {
    dispatch(fetchFarms());
  }, [dispatch]);

  const [showMenu, setShowMenu] = useState(false);

  if (loading && !farms) {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size='large' color={COLORS.primary} />
      </View>
    );
  }

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
              source={require("../assets/icons/back-arrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(PROFILE_SCREEN)}>
            <Image
              source={require("../assets/icons/user-profile.png")}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTxt}>List of Farms</Text>

        {/* ======= Log In Activities ========= */}
        <View style={styles.formView}>
          <View style={styles.farms}>
            {farms &&
              farms.map((item) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    key={item.id}
                    style={styles.field}
                    onPress={() =>
                      navigation.navigate(FARM_DETAILS_SCREEN, { item })
                    }
                  >
                    <Text style={styles.fieldTxt}>{item.name}</Text>
                    <Image
                      source={require("../assets/icons/arrow-right.png")}
                      style={styles.menuIcon}
                    />
                  </TouchableOpacity>
                );
              })}
            {showMenu && (
              <View style={styles.menu}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate(SELECT_CROP_SCREEN);
                    setShowMenu(false);
                  }}
                >
                  <Text style={styles.menuTxt}>Select Crop</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate(GEO_FENCING_SCREEN);
                    setShowMenu(false);
                  }}
                >
                  <Text style={styles.menuTxt}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setShowMenu(false);
                  }}
                >
                  <Text style={styles.menuTxt}>Start Activity</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Fields;

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
    flex: 1,
    height: "100%",
  },

  headTxt: {
    fontWeight: "500",
    fontSize: "12@ms",
    fontFamily: "Poppins-Regular",
    padding: "12@ms",
    backgroundColor: COLORS.surface,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    flex: 1,
  },
  headTxtLocation: {
    fontWeight: "500",
    fontSize: "12@ms",
    fontFamily: "Poppins-Regular",
    padding: "12@ms",
    backgroundColor: COLORS.surface,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    flex: 2,
  },
  farm: {
    width: "100%",
  },
  menuIcon: {
    width: "14@ms",
    height: "14@ms",
    resizeMode: "contain",
  },
  field: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "15@ms",
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    position: "relative",
  },
  fieldTxt: {
    fontFamily: "Poppins-Regular",
    flex: 1,
    fontSize: "12@ms",
  },
  fieldTxtLocation: {
    fontFamily: "Poppins-Regular",
    flex: 2,
    fontSize: "12@ms",
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
    zIndex: 10000,
  },
  tableHead: {
    flexDirection: "row",
    alignItems: "center",
  },
});
