import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../../components/Wrapper";
import {
  REGISTER_SCREEN,
  RESET_PASSWORD_SCREEN,
} from "../../constants/routeNames";
import { COLORS } from "../../constants/theme";

const Login = ({ navigation, setIndex }) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ========== Email ========= */}
        <TextInput
          placeholder='Email'
          placeholderTextColor={COLORS.text_grey}
          autoCapitalize='none'
          keyboardType='email-address'
          style={styles.input}
        />

        {/* ========= Password ======== */}
        <View style={styles.inputView}>
          <TextInput
            placeholder='Create password'
            placeholderTextColor={COLORS.text_grey}
            autoCapitalize='none'
            secureTextEntry
            style={styles.input2}
          />
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/visible-eye-icon.png")}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* ========== Forgot Password ========= */}
        <View style={styles.forgot}>
          <Text style={styles.loginTxt}>Forgot Password?</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate(RESET_PASSWORD_SCREEN)}
          >
            <Text style={styles.loginTxt2}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* ========== Button View ============= */}
        <View style={styles.buttonView}>
          <TouchableOpacity activeOpacity={0.6} style={styles.registerBtn}>
            <Text style={styles.registerTxt}>Login</Text>
          </TouchableOpacity>

          {/* ===== Login ====== */}
          <View style={styles.login}>
            <Text style={styles.loginTxt}>Don't have an account?</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => setIndex(0)}>
              <Text style={styles.loginTxt2}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = ScaledSheet.create({
  input: {
    width: "100%",
    height: "42@vs",
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: "10@ms",
    color: COLORS.text_grey,
    borderColor: "#F3F3F3",
    marginBottom: "15@vs",
    fontFamily: "CircularStd-Medium",
  },
  inputView: {
    width: "100%",
    height: "42@vs",
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#F3F3F3",
    marginBottom: "15@vs",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "10@ms",
  },
  eyeIcon: {
    width: "16@ms",
    height: "14@ms",
    resizeMode: "contain",
  },
  input2: {
    width: "90%",
    fontFamily: "CircularStd-Medium",
    color: COLORS.text_grey,
  },
  buttonView: {
    marginTop: "40@vs",
  },
  registerBtn: {
    width: "100%",
    height: "45@vs",
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  registerTxt: {
    fontFamily: "CircularStd-Medium",
    color: COLORS.background,
  },
  login: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15@vs",
  },
  forgot: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  loginTxt: {
    fontFamily: "CircularStd-Medium",
    fontSize: "14@ms",
    marginRight: "5@ms",
  },
  loginTxt2: {
    fontFamily: "CircularStd-Medium",
    fontSize: "14@ms",
    marginRight: "5@ms",
    color: COLORS.primary,
  },
  headTxt: {
    fontFamily: "CircularStd-Medium",
    fontSize: "16@ms",
    fontWeight: "700",
    marginBottom: "30@vs",
  },
});
