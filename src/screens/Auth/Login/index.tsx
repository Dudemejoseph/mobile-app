import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import { Button, Caption, Snackbar, Text, TextInput } from "react-native-paper";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";
import { AuthLoginInput, UserState } from "../../../interfaces/user";
import { loginUser } from "../../../redux/features/user/user_actions";
import { userSelector } from "../../../redux/features/user/user_reducer";
import { LoginSchema } from "../../../schema/auth";
import styles from "./styles";
FeatherIcon.loadFont();

const LoginScreen = () => {
  const dispatch = useDispatch();
  const scheme = useColorScheme();
  const { colors, dark } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [tempValues, setTempValues] = useState<AuthLoginInput | any>(null);
  const [errorSnackbarVisible, setErrorSnackbarVisible] =
    useState<boolean>(false);
  const { authLoading, error } = useSelector(userSelector) as UserState;

  const submitForm = async (values: AuthLoginInput) => {
    setTempValues(values);
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (error) {
      setErrorSnackbarVisible(true);
    }
  }, [error]);

  const ErrorSnackbar = () => {
    return (
      <Snackbar
        theme={dark ? combinedDarkTheme : combinedDefaultTheme}
        style={{
          backgroundColor: dark
            ? combinedDarkTheme.colors.error
            : combinedDefaultTheme.colors.error,
        }}
        visible={errorSnackbarVisible}
        onDismiss={() => setErrorSnackbarVisible(false)}
        action={{
          label: error?.includes("Invalid credentials")
            ? ""
            : error?.includes("Network")
            ? "Retry"
            : "",
          onPress: () => {
            // Do something
            if (error?.includes("Network Error")) {
              dispatch(loginUser(tempValues));
            }
          },
        }}
      >
        {error}
      </Snackbar>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.wrapper}
    >
      <ScrollView>
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values: AuthLoginInput) => submitForm(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.container}>
              <View style={styles.inputView}>
                <TextInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  mode="outlined"
                  onBlur={handleBlur("email")}
                  error={errors?.email ? true : false}
                  selectionColor={colors.text}
                  theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                  outlineColor={
                    dark
                      ? combinedDarkTheme.colors.border
                      : combinedDefaultTheme.colors.backdrop
                  }
                />

                {errors?.email && (
                  <Text
                    style={[
                      styles.errorText,
                      {
                        color:
                          scheme === "dark"
                            ? combinedDarkTheme.colors.error
                            : combinedDefaultTheme.colors.error,
                      },
                    ]}
                  >
                    {errors?.email}
                  </Text>
                )}
              </View>

              <View style={styles.inputView}>
                <TextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  mode="outlined"
                  secureTextEntry={!passwordVisible}
                  onBlur={handleBlur("password")}
                  error={errors?.password ? true : false}
                  selectionColor={colors.text}
                  theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                  outlineColor={
                    dark
                      ? combinedDarkTheme.colors.border
                      : combinedDefaultTheme.colors.backdrop
                  }
                  right={
                    <TextInput.Icon
                      name={passwordVisible ? "eye-off" : "eye"}
                      size={24}
                      onPress={() => {
                        setPasswordVisible(!passwordVisible);
                      }}
                    />
                  }
                />

                {errors?.password && (
                  <Text
                    style={[
                      styles.errorText,
                      {
                        color:
                          scheme === "dark"
                            ? combinedDarkTheme.colors.error
                            : combinedDefaultTheme.colors.error,
                      },
                    ]}
                  >
                    {errors?.password}
                  </Text>
                )}
              </View>

              <View style={styles.buttonView}>
                <Button
                  onPress={handleSubmit}
                  theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                  mode={scheme === "dark" ? "contained" : "contained"}
                  loading={authLoading}
                  contentStyle={styles.buttonInnerStyle}
                  labelStyle={[
                    styles.buttonLabelStyle,
                    {
                      color:
                        scheme === "dark"
                          ? combinedDarkTheme.colors.text
                          : combinedDefaultTheme.colors.background,
                    },
                  ]}
                >
                  Login
                </Button>
              </View>

              <Caption style={styles.infoText}>
                Forgot password?{" "}
                <Text
                  style={[
                    styles.infoSubText,
                    { color: dark ? colors.text : colors.primary },
                  ]}
                >
                  Reset
                </Text>
              </Caption>
            </View>
          )}
        </Formik>
      </ScrollView>
      {error && ErrorSnackbar()}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;