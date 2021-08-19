import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "../../constants/theme";
import { registerUser, userSelector } from "../../redux/features/userSlice";
import Toast from "react-native-toast-message";

const Register = ({ setIndex }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(userSelector);
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
    dispatch(registerUser(data));
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
        {/* ========= First Name ========= */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='First name'
              placeholderTextColor={COLORS.text_grey}
              autoCapitalize='words'
              value={value}
              onChangeText={(value) => onChange(value)}
              style={styles.input}
            />
          )}
          name='firstname'
          rules={{ required: true }}
        />
        {errors.firstname && (
          <Text style={styles.err}>This field is required</Text>
        )}

        {/* ========= Last Name ========= */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Last name'
              placeholderTextColor={COLORS.text_grey}
              autoCapitalize='words'
              value={value}
              onChangeText={(value) => onChange(value)}
              style={styles.input}
            />
          )}
          name='lastname'
          rules={{ required: true }}
        />
        {errors.lastname && (
          <Text style={styles.err}>This field is required</Text>
        )}

        {/* ========== Email ========= */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Email'
              placeholderTextColor={COLORS.text_grey}
              autoCapitalize='none'
              keyboardType='email-address'
              value={value}
              onChangeText={(value) => onChange(value)}
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
                placeholder='Create password'
                placeholderTextColor={COLORS.text_grey}
                autoCapitalize='none'
                secureTextEntry
                value={value}
                onChangeText={(value) => onChange(value)}
                style={styles.input2}
              />
            )}
            name='password'
            rules={{ required: true }}
          />
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/visible-eye-icon.png")}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.err}>This field is required</Text>
        )}

        {/* ========= Confirm Password ======== */}
        <View style={styles.inputView}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder='Confirm password'
                placeholderTextColor={COLORS.text_grey}
                autoCapitalize='none'
                secureTextEntry
                value={value}
                onChangeText={(value) => onChange(value)}
                style={styles.input2}
              />
            )}
            name='password_confirmation'
            rules={{ required: true }}
          />
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/visible-eye-icon.png")}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        {errors.password_confirmation && (
          <Text style={styles.err}>This field is required</Text>
        )}

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
              <Text style={styles.registerTxt}>Register</Text>
            )}
          </TouchableOpacity>

          {/* ===== Login ====== */}
          <View style={styles.login}>
            <Text style={styles.loginTxt}>Already have an account?</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => setIndex(1)}>
              <Text style={styles.loginTxt2}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

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
