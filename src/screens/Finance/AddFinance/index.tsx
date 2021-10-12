import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import {
  Button,
  HelperText,
  Subheading,
  Surface,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../../components/Shared/Appbar";
import ErrorComponent from "../../../components/Shared/ErrorComponent";
import LoadingComponent from "../../../components/Shared/LoadingComponent";
import ErrorSnackbar from "../../../components/Shared/Snackbar/ErrorSnackbar";
import InfoSnackbar from "../../../components/Shared/Snackbar/InfoSnackbar";
import Wrapper from "../../../components/Shared/Wrapper";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";
import { Farm, FarmState } from "../../../interfaces/farm";
import {
  AddFinanceInput,
  TransactionsState,
} from "../../../interfaces/transactions";
import { getFarms } from "../../../redux/features/farms/farm_actions";
import { farmSelector } from "../../../redux/features/farms/farm_reducer";
import { addFinance } from "../../../redux/features/transactions/transactions_actions";
import { transactionsSelector } from "../../../redux/features/transactions/transactions_reducer";
import { AddFinanceSchema } from "../../../schema/transactions";
import styles from "./styles";

const AddFinance = () => {
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();
  const { farmData, fetching, error } = useSelector(farmSelector) as FarmState;
  const { addingFinance, addingFinanceError, addingFinanceMessage } =
    useSelector(transactionsSelector) as TransactionsState;
  const [tempValues, setTempValues] = useState<AddFinanceInput | any>(null);
  const [errorSnackbarVisible, setErrorSnackbarVisible] =
    useState<boolean>(false);
  const [infoSnackbarVisible, setInfoSnackbarVisible] =
    useState<boolean>(false);
  const [selectedFarm, setSelectedFarm] = useState<Farm | any>(null);
  const [farm_id, setFarmId] = useState<number | any>("");
  const [selectedType, setSelectedType] = useState<"credit" | "debit">(
    "credit"
  );

  useEffect(() => {
    const fetchFarms = async () => {
      dispatch(getFarms());
    };
    if (!farmData) {
      fetchFarms();
    }
  }, [dispatch, farmData]);

  const retry = async () => {
    dispatch(getFarms());
  };

  const submitForm = async (values: AddFinanceInput) => {
    setTempValues(values);
    dispatch(addFinance(values));
  };

  useEffect(() => {
    if (addingFinanceError) {
      setErrorSnackbarVisible(true);
    }

    if (addingFinanceMessage) {
      setInfoSnackbarVisible(true);
    }
  }, [addingFinanceError, addingFinanceMessage]);

  if (fetching) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <ErrorComponent
        error={error}
        loading={fetching}
        action={() => {
          retry();
        }}
      />
    );
  }

  return (
    <Wrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.wrapper}
      >
        <ScrollView>
          <AppbarComponent title="Add Cost" backButton={true} search={false} />
          <Formik
            validationSchema={AddFinanceSchema}
            initialValues={
              {
                farm_id: farm_id,
                activity: "",
                amount: 0.0,
                note: "",
                type: selectedType,
              } as AddFinanceInput
            }
            onSubmit={(values: AddFinanceInput) => submitForm(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
            }) => (
              <Surface style={styles.surface}>
                <View
                  style={[
                    styles.headingView,
                    {
                      backgroundColor: dark
                        ? combinedDarkTheme.colors.placeholder
                        : combinedDefaultTheme.colors.border,
                      borderBottomColor: dark
                        ? combinedDarkTheme.colors.placeholder
                        : combinedDefaultTheme.colors.border,
                    },
                  ]}
                >
                  <Subheading
                    style={[
                      styles.headingText,
                      {
                        color: dark
                          ? combinedDarkTheme.colors.text
                          : combinedDefaultTheme.colors.text,
                      },
                    ]}
                  >
                    Record Finance
                  </Subheading>
                </View>
                <View style={styles.inputView}>
                  <Surface
                    style={[
                      styles.pickerView,
                      {
                        borderColor: dark
                          ? combinedDarkTheme.colors.primary
                          : combinedDefaultTheme.colors.backdrop,
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  >
                    <Picker
                      mode="dropdown"
                      selectedValue={selectedFarm}
                      onValueChange={(itemValue: Farm) => {
                        setSelectedFarm(itemValue);
                        setFarmId(itemValue.id);
                        setFieldValue("farm_id", itemValue.id);
                      }}
                      itemStyle={[
                        styles.pickerView,
                        {
                          borderColor: dark
                            ? combinedDarkTheme.colors.primary
                            : combinedDefaultTheme.colors.text,
                        },
                      ]}
                    >
                      {farmData?.map((item: Farm, index: number) => {
                        return (
                          <Picker.Item
                            key={index}
                            color={
                              dark
                                ? combinedDarkTheme.colors.primary
                                : combinedDefaultTheme.colors.text
                            }
                            label={item.name}
                            value={item}
                            style={styles.buttonLabel}
                          />
                        );
                      })}
                    </Picker>
                  </Surface>
                  {errors?.farm_id && (
                    <HelperText
                      type="error"
                      visible={errors?.farm_id ? true : false}
                    >
                      {errors?.farm_id}
                    </HelperText>
                  )}
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    label="Activity"
                    value={values.activity}
                    onChangeText={handleChange("activity")}
                    mode="outlined"
                    onBlur={handleBlur("activity")}
                    error={errors?.activity ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={
                      dark
                        ? combinedDarkTheme.colors.border
                        : combinedDefaultTheme.colors.backdrop
                    }
                    style={[
                      styles.buttonLabel,
                      {
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  />

                  {errors?.activity && (
                    <HelperText
                      type="error"
                      visible={errors?.activity ? true : false}
                    >
                      {errors?.activity}
                    </HelperText>
                  )}
                </View>

                <View style={styles.inputView}>
                  <Surface
                    style={[
                      styles.pickerView,
                      {
                        borderColor: dark
                          ? combinedDarkTheme.colors.primary
                          : combinedDefaultTheme.colors.backdrop,
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  >
                    <Picker
                      mode="dropdown"
                      selectedValue={selectedType}
                      onValueChange={(itemValue: "credit" | "debit") => {
                        setSelectedType(itemValue);
                        setFieldValue("type", itemValue);
                      }}
                      itemStyle={[
                        styles.pickerView,
                        {
                          borderColor: dark
                            ? combinedDarkTheme.colors.primary
                            : combinedDefaultTheme.colors.text,
                        },
                      ]}
                    >
                      <Picker.Item
                        color={
                          dark
                            ? combinedDarkTheme.colors.primary
                            : combinedDefaultTheme.colors.text
                        }
                        label="Credit"
                        value="credit"
                        style={styles.buttonLabel}
                      />
                      <Picker.Item
                        color={
                          dark
                            ? combinedDarkTheme.colors.primary
                            : combinedDefaultTheme.colors.text
                        }
                        label="Debit"
                        value="debit"
                        style={styles.buttonLabel}
                      />
                    </Picker>
                  </Surface>
                  {errors?.type && (
                    <HelperText
                      type="error"
                      visible={errors?.type ? true : false}
                    >
                      {errors?.type}
                    </HelperText>
                  )}
                </View>

                <View style={styles.inputView}>
                  <TextInput
                    label="Amount"
                    value={values.amount as any}
                    keyboardType="decimal-pad"
                    onChangeText={handleChange("amount")}
                    mode="outlined"
                    onBlur={handleBlur("amount")}
                    error={errors?.amount ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={
                      dark
                        ? combinedDarkTheme.colors.border
                        : combinedDefaultTheme.colors.backdrop
                    }
                    style={[
                      styles.buttonLabel,
                      {
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  />

                  {errors?.amount && (
                    <HelperText
                      type="error"
                      visible={errors?.amount ? true : false}
                    >
                      {errors?.amount}
                    </HelperText>
                  )}
                </View>

                <View style={styles.inputView}>
                  <TextInput
                    label="Note"
                    multiline={true}
                    numberOfLines={8}
                    value={values.note}
                    onChangeText={handleChange("note")}
                    mode="outlined"
                    onBlur={handleBlur("note")}
                    error={errors?.note ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={
                      dark
                        ? combinedDarkTheme.colors.border
                        : combinedDefaultTheme.colors.backdrop
                    }
                    style={styles.buttonLabel}
                  />

                  {errors?.note && (
                    <HelperText
                      type="error"
                      visible={errors?.note ? true : false}
                    >
                      {errors?.note}
                    </HelperText>
                  )}
                </View>
                <Button
                  onPress={handleSubmit}
                  uppercase={false}
                  theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                  mode="contained"
                  style={styles.submit}
                  loading={addingFinance}
                  labelStyle={[
                    styles.buttonLabel,
                    {
                      color: dark
                        ? combinedDarkTheme.colors.background
                        : combinedDefaultTheme.colors.background,
                    },
                  ]}
                >
                  Submit
                </Button>
              </Surface>
            )}
          </Formik>
        </ScrollView>
        {addingFinanceError &&
          ErrorSnackbar(
            errorSnackbarVisible,
            setErrorSnackbarVisible,
            addingFinanceError,
            () => submitForm(tempValues)
          )}
        {addingFinanceMessage &&
          InfoSnackbar(
            infoSnackbarVisible,
            setInfoSnackbarVisible,
            addingFinanceMessage
          )}
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default AddFinance;
