import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import { useForm, Controller } from "react-hook-form";
import { RESET_PASSWORD_SCREEN } from "../../constants/routeNames";
import { COLORS } from "../../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, userSelector } from "../../redux/features/userSlice";

const Login = ({ navigation, setIndex }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(userSelector);
  const [showPassword, setShow] = useState(false);
  // Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  /**
   * Handle Form Submit
   * @param {Object} data
   */
  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };

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
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ========== Email ========= */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Email'
              placeholderTextColor={COLORS.text_grey}
              autoCapitalize='none'
              value={value}
              onChangeText={(value) => onChange(value)}
              keyboardType='email-address'
              style={styles.input}
            />
          )}
          name='email'
          rules={{ required: true }}
        />
        {errors.email && <Text style={styles.err}>This field is required</Text>}

        {/* ========= Password ======== */}
        <View style={styles.inputView}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder='Password'
                placeholderTextColor={COLORS.text_grey}
                autoCapitalize='none'
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={(value) => onChange(value)}
                style={styles.input2}
              />
            )}
            name='password'
            rules={{ required: true }}
          />
          {showPassword ? (
            <TouchableOpacity onPress={() => setShow(!showPassword)}>
              <Image
                source={require("../../assets/icons/Hidden.png")}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShow(!showPassword)}>
              <Image
                source={require("../../assets/icons/visible-eye-icon.png")}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        {errors.password && (
          <Text style={styles.err}>This field is required</Text>
        )}

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
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.registerBtn}
            onPress={handleSubmit(onSubmit)}
          >
            {loading ? (
              <ActivityIndicator size='large' color={COLORS.background} />
            ) : (
              <Text style={styles.registerTxt}>Login</Text>
            )}
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
    marginTop: "15@vs",
    fontFamily: "CircularStd-Medium",
  },
  inputView: {
    width: "100%",
    height: "42@vs",
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#F3F3F3",
    marginTop: "15@vs",
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
  err: {
    fontSize: "12@ms",
    fontWeight: "300",
    color: COLORS.text_grey,
    marginTop: "5@vs",
  },
});
