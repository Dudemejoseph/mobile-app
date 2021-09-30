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
import { ScaledSheet } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../components/Wrapper";
import { PROFILE_SCREEN } from "../../constants/routeNames";
import { COLORS } from "../../constants/theme";
import {
  farmSelector,
  fetchFarmActivitiesAction,
} from "../../redux/features/farmSlice";
import {
  addFinance,
  transactionsSelector,
} from "../../redux/features/transactionSlice";

const AddFinance = ({ navigation }) => {
  const dispatch = useDispatch();
  const { farms, farmActivities } = useSelector(farmSelector);
  const { error, message, loading } = useSelector(transactionsSelector);

  const [activity, setActivity] = useState("Select Activity");
  const [showActivityPicker, setShowActivity] = useState(false);
  const [farm, setFarm] = useState("Select Farm");
  const [farm_id, setFarmID] = useState("");
  const [showFarmPicker, setShowFarm] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    message &&
      Toast.show({
        type: "success",
        text1: "Success",
        text2: message,
        topOffset: 40,
      });

    message && navigation.navigate("Finance");
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

  useEffect(() => {
    dispatch(fetchFarmActivitiesAction());
  }, []);

  const addToFinance = () => {
    const data = {
      farm_id,
      amount: parseFloat(amount),
      note,
      activity,
      type: "credit",
    };
    dispatch(addFinance(data));
  };
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
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate(PROFILE_SCREEN)}
          >
            <Image
              source={require("../../assets/icons/user-profile.png")}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTxt}>Add Finance</Text>

        {/* ======= Log In Activities ========= */}
        <View style={styles.formView}>
          <Text style={styles.headTxt}>Record Finance</Text>
          <View style={styles.form}>
            {/* ========== Farms ========= */}
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
                        setShowFarm(false);
                        setFarmID(item?.id);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ========== Activity ========= */}
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

            {/* ======== Amount ========== */}
            <TextInput
              placeholder="Amount"
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
              onChangeText={(val) => setAmount(val)}
            />

            {/* ======== Description ========== */}
            <TextInput
              placeholder="Note..."
              style={styles.inputDesc}
              multiline
              placeholderTextColor={COLORS.text_grey}
              onChangeText={(val) => setNote(val)}
            />

            {/* ========= Buttons ======== */}
            <View style={styles.btnView}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.createBtn}
                onPress={addToFinance}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={COLORS.background} />
                ) : (
                  <Text style={styles.createTxt}>Done</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default AddFinance;

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
