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
import Wrapper from "../components/Wrapper";
import { COLORS } from "../constants/theme";
import { editUser, userSelector } from "../redux/features/userSlice";
import Toast from "react-native-toast-message";
import { PROFILE_SCREEN } from "../constants/routeNames";

const EditProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { loading, message, error, users } = useSelector(userSelector);
  const [firstname, setFirstName] = useState(users?.firstname);
  const [lastname, setLastName] = useState(users?.lastname);
  const [email, setEmail] = useState(users?.email);
  const [phone, setPhone] = useState(users?.phone);
  const [address, setAddress] = useState(users?.address);
  

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

  const handleSubmit = async () => {
    let data = {
      firstname,
      lastname,
      email,
      phone,
    };
    await dispatch(editUser(users?.id, data));
    navigation.navigate(PROFILE_SCREEN);
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
              source={require("../assets/icons/back-arrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTxt}>Edit Profile</Text>

        {/* ======= edit Profile ========= */}
        <View style={styles.formView}>
          <Text style={styles.headTxt}>Edit</Text>
          <View style={styles.form}>
            {/* ======== First Name ========== */}
            <TextInput
              placeholder="First Name"
              defaultValue={firstname}
              onChangeText={(e) => setFirstName(e)}
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Last Name ========== */}
            <TextInput
              placeholder="Last Name"
              defaultValue={lastname}
              onChangeText={(e) => setLastName(e)}
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Email ========== */}
            <TextInput
              placeholder="Email"
              defaultValue={email}
              onChangeText={(e) => setEmail(e)}
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Phone ========== */}
            <TextInput
              placeholder="Phone"
              defaultValue={phone}
              onChangeText={(e) => setPhone(e)}
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== address ========== */}
            <TextInput
              placeholder="Address"
              style={styles.input}
              defaultValue={address}
              onChangeText={(e) => setAddress(e)}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ========= Buttons ======== */}
            <View style={styles.btnView}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.createBtn}
                onPress={() => handleSubmit()}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={COLORS.background} />
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

export default EditProfile;

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
