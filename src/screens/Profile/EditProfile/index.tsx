import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import Wrapper from "../../../components/Shared/Wrapper";
import AppbarComponent from "../../../components/Shared/Appbar";
import styles from "./styles";
import { Formik } from "formik";
import { EditProfileSchema } from "../../../schema/profile";
import { EditProfileInput, UserState } from "../../../interfaces/user";
import { userSelector } from "../../../redux/features/user/user_reducer";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../redux/features/user/user_actions";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";
import ErrorSnackbar from "../../../components/Shared/Snackbar/ErrorSnackbar";
import InfoSnackbar from "../../../components/Shared/Snackbar/InfoSnackbar";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();
  const [tempValues, setTempValues] = useState<EditProfileInput | any>(null);
  const [errorSnackbarVisible, setErrorSnackbarVisible] =
    useState<boolean>(false);
  const [infoSnackbarVisible, setInfoSnackbarVisible] =
    useState<boolean>(false);
  const { editing, editingError, editingMessage, user } = useSelector(
    userSelector
  ) as UserState;
  const scheme = useColorScheme();

  const submitForm = async (values: EditProfileInput) => {
    setTempValues(values);
    dispatch(editUser(user?.id as number, values));
  };

  useEffect(() => {
    if (editingError) {
      setErrorSnackbarVisible(true);
    }

    if (editingMessage) {
      setInfoSnackbarVisible(true);
    }
  }, [editingError, editingMessage]);

  return (
    <Wrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.wrapper}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppbarComponent
            profileIcon={false}
            backButton={true}
            title="Edit Profile"
            search={false}
          />
          <Formik
            validationSchema={EditProfileSchema}
            initialValues={{
              firstname: user?.firstname ?? "",
              lastname: user?.lastname ?? "",
              email: user?.email ?? "",
              phone: user?.phone ?? "",
              address: user?.address ?? "",
            }}
            onSubmit={(values: EditProfileInput) => submitForm(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
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
                    outlineColor={
                      dark
                        ? combinedDarkTheme.colors.border
                        : combinedDefaultTheme.colors.backdrop
                    }
                  />

                  {errors?.firstname && (
                    <HelperText
                      type="error"
                      visible={errors?.firstname ? true : false}
                    >
                      {errors?.firstname}
                    </HelperText>
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
                    outlineColor={
                      dark
                        ? combinedDarkTheme.colors.border
                        : combinedDefaultTheme.colors.backdrop
                    }
                  />

                  {errors?.lastname && (
                    <HelperText
                      type="error"
                      visible={errors?.lastname ? true : false}
                    >
                      {errors?.lastname}
                    </HelperText>
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
                    outlineColor={
                      dark
                        ? combinedDarkTheme.colors.border
                        : combinedDefaultTheme.colors.backdrop
                    }
                  />

                  {errors?.email && (
                    <HelperText
                      type="error"
                      visible={errors?.email ? true : false}
                    >
                      {errors?.email}
                    </HelperText>
                  )}
                </View>

                <View style={styles.inputView}>
                  <TextInput
                    label="Phone number"
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    mode="outlined"
                    onBlur={handleBlur("phone")}
                    error={errors?.phone ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={
                      dark
                        ? combinedDarkTheme.colors.border
                        : combinedDefaultTheme.colors.backdrop
                    }
                  />
                  {errors?.phone && (
                    <HelperText
                      type="error"
                      visible={errors?.phone ? true : false}
                    >
                      {errors?.phone}
                    </HelperText>
                  )}
                </View>

                <View style={styles.inputView}>
                  <TextInput
                    label="Address"
                    value={values.address}
                    onChangeText={handleChange("address")}
                    mode="outlined"
                    onBlur={handleBlur("address")}
                    error={errors?.phone ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={
                      dark
                        ? combinedDarkTheme.colors.border
                        : combinedDefaultTheme.colors.backdrop
                    }
                  />
                  {errors?.address && (
                    <HelperText
                      type="error"
                      visible={errors?.phone ? true : false}
                    >
                      {errors?.address}
                    </HelperText>
                  )}
                </View>

                <View style={styles.buttonView}>
                  <Button
                    onPress={handleSubmit}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    mode={scheme === "dark" ? "contained" : "contained"}
                    loading={editing}
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
                    Save
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
        {editingError &&
          ErrorSnackbar(
            errorSnackbarVisible,
            setErrorSnackbarVisible,
            editingError,
            () => submitForm(tempValues)
          )}
        {editingMessage &&
          InfoSnackbar(
            infoSnackbarVisible,
            setInfoSnackbarVisible,
            editingMessage
          )}
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default EditProfile;
