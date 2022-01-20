import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, useColorScheme, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import FeatherIcon from "react-native-vector-icons/Feather";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";
import { AuthRegisterInput } from "../../../interfaces/user";
import { SignupSchema } from "../../../schema/auth";
import styles from "./styles";
FeatherIcon.loadFont();

const RegisterScreen = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView>
        <RegisterForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const RegisterForm = () => {
  const scheme = useColorScheme();
  const { colors, dark } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordVisible2, setPasswordVisible2] = useState<boolean>(false);

  return (
    <Formik
      validationSchema={SignupSchema}
      initialValues={{
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        password_confirmation: "",
      }}
      onSubmit={(values: AuthRegisterInput) => console.log("register values", values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, initialTouched }) => (
        <View style={styles.container}>
          <View style={styles.inputView}>
            <TextInput
              label="First name"
              value={values.firstname}
              onChangeText={handleChange("firstname")}
              mode="outlined"
              onBlur={handleBlur("firstname")}
              error={errors?.firstname ? true : false}
              selectionColor={colors.text}
              theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
            />

            {errors?.firstname && initialTouched.firstname && (
              <Text
                style={[
                  styles.errorText,
                  {
                    color: scheme === "dark" ? combinedDarkTheme.colors.error : combinedDefaultTheme.colors.error,
                  },
                ]}
              >
                {errors?.firstname}
              </Text>
            )}
          </View>

          <View style={styles.inputView}>
            <TextInput
              label="Last name"
              value={values.lastname}
              onChangeText={handleChange("lastname")}
              mode="outlined"
              onBlur={handleBlur("lastname")}
              error={errors?.lastname ? true : false}
              selectionColor={colors.text}
              theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
            />

            {errors?.lastname && (
              <Text
                style={[
                  styles.errorText,
                  {
                    color: scheme === "dark" ? combinedDarkTheme.colors.error : combinedDefaultTheme.colors.error,
                  },
                ]}
              >
                {errors?.lastname}
              </Text>
            )}
          </View>

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
              outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
            />

            {errors?.email && (
              <Text
                style={[
                  styles.errorText,
                  {
                    color: scheme === "dark" ? combinedDarkTheme.colors.error : combinedDefaultTheme.colors.error,
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
              outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
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
                    color: scheme === "dark" ? combinedDarkTheme.colors.error : combinedDefaultTheme.colors.error,
                  },
                ]}
              >
                {errors?.password}
              </Text>
            )}
          </View>

          <View style={styles.inputView}>
            <TextInput
              label="Confirm Password"
              value={values.password_confirmation}
              onChangeText={handleChange("password_confirmation")}
              mode="outlined"
              secureTextEntry={passwordVisible}
              onBlur={handleBlur("password_confirmation")}
              error={errors?.password_confirmation ? true : false}
              selectionColor={colors.text}
              theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
              right={
                <TextInput.Icon
                  name={!passwordVisible2 ? "eye-off" : "eye"}
                  size={24}
                  onPress={() => {
                    setPasswordVisible2(!passwordVisible2);
                  }}
                />
              }
            />

            {errors?.password_confirmation && (
              <Text
                style={[
                  styles.errorText,
                  {
                    color: scheme === "dark" ? combinedDarkTheme.colors.error : combinedDefaultTheme.colors.error,
                  },
                ]}
              >
                {errors?.password_confirmation}
              </Text>
            )}
          </View>

          <View style={styles.buttonView}>
            <Button
              onPress={handleSubmit}
              theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              mode={scheme === "dark" ? "contained" : "contained"}
              loading={false}
              contentStyle={styles.buttonInnerStyle}
              labelStyle={[
                styles.buttonLabelStyle,
                {
                  color: scheme === "dark" ? combinedDarkTheme.colors.text : combinedDefaultTheme.colors.background,
                },
              ]}
            >
              Register
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterScreen;
