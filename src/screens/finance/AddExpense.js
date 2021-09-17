import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../components/Wrapper";
import { COLORS } from "../../constants/theme";
import * as Animatable from "react-native-animatable";
import {
  createFarmActivity,
  farmSelector,
  fetchActivities,
  fetchCropActivities,
  fetchCrops,
  fetchFarms,
  submitCropActivities,
} from "../../redux/features/farmSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";

const activities = [
  {
    id: "1",
    name: "NPK",
  },
  {
    id: "2",
    name: "Urea",
  },
  {
    id: "3",
    name: "Water",
  },
  {
    id: "4",
    name: "Pre emergence herbicide",
  },
  {
    id: "5",
    name: "Post emergence herbicide",
  },
  {
    id: "6",
    name: "insecticide",
  },
  {
    id: "7",
    name: "fungicide",
  },
  {
    id: "8",
    name: "Seeds",
  },
];
const labors = [
  {
    id: "1",
    name: "Planting/Seeding",
  },
  {
    id: "2",
    name: "Spraying",
  },
  {
    id: "3",
    name: "Application of NPK",
  },
  {
    id: "4",
    name: "Application of Urea",
  },
];
const mechanizations = [
  {
    id: "1",
    name: "Ploughing",
  },
  {
    id: "2",
    name: "Harrowing",
  },
  {
    id: "3",
    name: "Ridging",
  },
];
const logisticss = [
  {
    id: "1",
    name: "Transportation",
  },
  {
    id: "2",
    name: "Feeding",
  },
  {
    id: "3",
    name: "Airtime",
  },
];
const contigencies = [
  {
    id: "1",
    name: "Weeding",
  },
];
const others = [
  {
    id: "1",
    name: "Consultation",
  },
  {
    id: "2",
    name: "Insurance",
  },
  {
    id: "3",
    name: "Interest",
  },
];

const AddExpense = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(farmSelector);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [start_date, setStartDate] = useState("Select Date");
  const [category, setCategory] = useState("Select Category");
  const [labor, setLabor] = useState("Select Labor");
  const [mechanization, setMechanization] = useState("Select Mechanization");
  const [logistics, setLogistics] = useState("Select Logistics");
  const [contigency, setContigency] = useState("Select Contigency");
  const [other, setOther] = useState("Others");
  const [showLaborPicker, setShowLabor] = useState(false);
  const [showContigencyPicker, setShowContigency] = useState(false);
  const [showLogisticsPicker, setShowLogistics] = useState(false);
  const [showMechanizationPicker, setShowMechanization] = useState(false);
  const [showActivityPicker, setShowActivity] = useState(false);
  const [showOthersPicker, setShowOthers] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDate = (date) => {
    setStartDate(date.toString().substr(0, 16));
    hideDatePicker();
  };

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

        <Text style={styles.headerTxt}>Add Expense</Text>

        {/* ======= Log In Activities ========= */}
        <View style={styles.formView}>
          <Text style={styles.headTxt}>Record Expense</Text>
          <View style={styles.form}>
            {/* ========== Category ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowActivity(!showActivityPicker)}
            >
              <Text style={styles.dropTxt}>{category}</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            {showActivityPicker && (
              <Animatable.View style={styles.sizePicker} animation='fadeIn'>
                {activities.map((item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={item.id}
                      style={styles.size}
                      onPress={() => {
                        setCategory(item.name);
                        setShowActivity(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ======== Brand ========== */}
            <TextInput
              placeholder='Brand'
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Unit ========== */}
            <TextInput
              placeholder='Unit'
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Quantiy ========== */}
            <TextInput
              placeholder='Quantity'
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Price ========== */}
            <TextInput
              placeholder='Price'
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ========== Labor ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowLabor(!showLaborPicker)}
            >
              <Text style={styles.dropTxt}>{labor}</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            {showLaborPicker && (
              <Animatable.View style={styles.sizePicker} animation='fadeIn'>
                {labors.map((item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={item.id}
                      style={styles.size}
                      onPress={() => {
                        setLabor(item.name);
                        setShowLabor(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ========== Mechanization ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowMechanization(!showMechanizationPicker)}
            >
              <Text style={styles.dropTxt}>{mechanization}</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            {showMechanizationPicker && (
              <Animatable.View style={styles.sizePicker} animation='fadeIn'>
                {mechanizations.map((item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={item.id}
                      style={styles.size}
                      onPress={() => {
                        setMechanization(item.name);
                        setShowMechanization(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ========== Logistics ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowLogistics(!showLogisticsPicker)}
            >
              <Text style={styles.dropTxt}>{logistics}</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            {showLogisticsPicker && (
              <Animatable.View style={styles.sizePicker} animation='fadeIn'>
                {logisticss.map((item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={item.id}
                      style={styles.size}
                      onPress={() => {
                        setLogistics(item.name);
                        setShowLogistics(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ========== Contigency ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowContigency(!showContigencyPicker)}
            >
              <Text style={styles.dropTxt}>{contigency}</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            {showContigencyPicker && (
              <Animatable.View style={styles.sizePicker} animation='fadeIn'>
                {contigencies.map((item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={item.id}
                      style={styles.size}
                      onPress={() => {
                        setContigency(item.name);
                        setShowContigency(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ========== Others ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowOthers(!showOthersPicker)}
            >
              <Text style={styles.dropTxt}>{other}</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            {showOthersPicker && (
              <Animatable.View style={styles.sizePicker} animation='fadeIn'>
                {others.map((item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={item.id}
                      style={styles.size}
                      onPress={() => {
                        setOther(item.name);
                        setShowOthers(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ======== Balance ========== */}
            <TextInput
              placeholder='Balance to be paid'
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ========== Select Date ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dateBtn}
              onPress={showDatePicker}
            >
              <Image
                source={require("../../assets/icons/calender-icon.png")}
                style={styles.dateIcon}
              />
              <Text style={styles.dropTxt}>{start_date}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode='date'
              onConfirm={handleDate}
              onCancel={hideDatePicker}
            />

            {/* ======== Description ========== */}
            <TextInput
              placeholder='Note...'
              style={styles.inputDesc}
              multiline
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ========= Buttons ======== */}
            <View style={styles.btnView}>
              <TouchableOpacity activeOpacity={0.6} style={styles.createBtn}>
                <Text style={styles.createTxt}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default AddExpense;

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