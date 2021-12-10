import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScaledSheet } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../components/Shared/Wrapper";
import { COLORS } from "../../constants/theme";
import {
  farmSelector,
  fetchCropActivities,
  fetchCrops,
  fetchFarmActivitiesAction,
  fetchFarms,
  submitCropActivities,
} from "../../redux/features/farmSlice";

const Activities = ({ navigation }) => {
  const dispatch = useDispatch();
  const { crops, loading, message, error, farms, farmActivities } =
    useSelector(farmSelector);
  console.log("farm ", farms);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [end_date, setEndDate] = useState("Select End Date");
  const [crop, setCrop] = useState("Choose Crop");
  const [crop_id, setCropID] = useState("");
  const [farm, setFarm] = useState("Choose Farm");
  const [farm_id, setFarmID] = useState("");
  const [activity, setActivity] = useState("Select activity");
  const [showCropPicker, setShowCrop] = useState(false);
  const [showFarmPicker, setShowFarm] = useState(false);
  const [showActivityPicker, setShowActivity] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleEndDate = (date) => {
    setEndDate(date.toString().substr(0, 16));
    hideDatePicker2();
  };

  useEffect(() => {
    dispatch(fetchFarmActivitiesAction());
    dispatch(fetchCropActivities());
    dispatch(fetchCrops());
    dispatch(fetchFarms());
  }, [dispatch]);

  const createCropActivity = () => {
    const data = { activity, crop_id, end_date, farm_id };
    dispatch(submitCropActivities(data));
  };

  useEffect(() => {
    message &&
      Toast.show({
        type: "success",
        text1: "Success",
        text2: message,
        topOffset: 40,
      });
    message && navigation.navigate("Home");
  }, [message, navigation]);

  useEffect(() => {
    error &&
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
        topOffset: 40,
      });
  }, [error]);
  return (
    <Wrapper customStyle={{ backgroundColor: "white", flex: 1, padding: 10 }}>
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

        <Text style={styles.headerTxt}>Activities</Text>

        {/* ======= Log In Activities ========= */}
        <View style={styles.formView}>
          <Text style={styles.headTxt}>Record Activities</Text>
          <View style={styles.form}>
            {/* ========== Choose Farm ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowFarm(!showFarmPicker)}
            >
              <Text style={styles.dropTxt}>{farm}</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            {showFarmPicker && (
              <Animatable.View style={styles.sizePicker} animation="fadeIn">
                {farms.map((item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={item.id}
                      style={styles.size}
                      onPress={() => {
                        setFarm(item.name);
                        setFarmID(item.id);
                        setShowFarm(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ========== Fertilizer Application ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowActivity(!showActivityPicker)}
            >
              <Text style={styles.dropTxt}>{activity}</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            {showActivityPicker && (
              <Animatable.View style={styles.sizePicker} animation="fadeIn">
                {farmActivities &&
                  farmActivities.map((item) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        key={item.id}
                        style={styles.size}
                        onPress={() => {
                          setActivity(item.activity);
                          setShowActivity(false);
                        }}
                      >
                        <Text>{item.activity}</Text>
                      </TouchableOpacity>
                    );
                  })}
              </Animatable.View>
            )}

            {/* ========== Choose Crop ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowCrop(!showCropPicker)}
            >
              <Text style={styles.dropTxt}>{crop}</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            {showCropPicker && (
              <Animatable.View style={styles.sizePicker} animation="fadeIn">
                {crops &&
                  crops.map((item) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        key={item.id}
                        style={styles.size}
                        onPress={() => {
                          setCrop(item.name);
                          setCropID(item.id);
                          setShowCrop(false);
                        }}
                      >
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
              </Animatable.View>
            )}

            {/* ========== Select Date 2 ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dateBtn}
              onPress={showDatePicker2}
            >
              <Image
                source={require("../../assets/icons/calender-icon.png")}
                style={styles.dateIcon}
              />
              <Text style={styles.dropTxt}>{end_date}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible2}
              mode="date"
              onConfirm={handleEndDate}
              onCancel={hideDatePicker2}
            />

            {/* ======== Description ========== */}
            <TextInput
              placeholder="Note..."
              style={styles.inputDesc}
              multiline
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ========= Buttons ======== */}
            <View style={styles.btnView}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.createBtn}
                onPress={createCropActivity}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.background} size="small" />
                ) : (
                  <Text style={styles.createTxt}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Activities;

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
  form: {
    width: "100%",
    padding: "14@ms",
  },
  input: {
    width: "100%",
    height: "40@vs",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    color: COLORS.text_dark,
    paddingHorizontal: "10@ms",
    fontFamily: "Poppins-Regular",
    marginTop: "15@vs",
  },
  inputDesc: {
    width: "100%",
    height: "80@vs",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    color: COLORS.text_dark,
    paddingHorizontal: "10@ms",
    fontFamily: "Poppins-Regular",
    marginTop: "15@vs",
    backgroundColor: COLORS.surface,
  },
  dropBtn: {
    height: "40@vs",
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "10@ms",
    marginTop: "15@vs",
  },
  dateBtn: {
    height: "40@vs",
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "10@ms",
    marginTop: "15@vs",
  },
  dropIcon: {
    width: "10@ms",
    height: "10@ms",
    resizeMode: "contain",
  },
  dateIcon: {
    width: "18@ms",
    height: "18@ms",
    resizeMode: "contain",
    marginRight: "10@ms",
  },
  dropTxt: {
    color: COLORS.text_grey,
    fontFamily: "Poppins-Regular",
  },
  btnView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "40@vs",
  },
  createBtn: {
    width: "90@ms",
    height: "35@vs",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  createTxt: {
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    color: COLORS.background,
  },
  sizePicker: {
    width: "100%",
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 5,
    borderRadius: 4,
    zIndex: 10000,
  },
  size: {
    padding: "6@ms",
  },
});
