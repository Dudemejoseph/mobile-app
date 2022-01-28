import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, HelperText, Paragraph, ProgressBar, Subheading, Surface, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../../components/Shared/Appbar";
import ErrorComponent from "../../../components/Shared/ErrorComponent";
import LoadingComponent from "../../../components/Shared/LoadingComponent";
import ErrorSnackbar from "../../../components/Shared/Snackbar/ErrorSnackbar";
import InfoSnackbar from "../../../components/Shared/Snackbar/InfoSnackbar";
import Wrapper from "../../../components/Shared/Wrapper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";
import { Farm, FarmState } from "../../../interfaces/farm";
import { AddFarmExpenseInput, TransactionsState } from "../../../interfaces/transactions";
import { fetchCategoryActivitesAction, getFarms } from "../../../redux/features/farms/farm_actions";
import { farmSelector } from "../../../redux/features/farms/farm_reducer";
import { addFarmExpenseAction } from "../../../redux/features/transactions/transactions_actions";
import { transactionsSelector } from "../../../redux/features/transactions/transactions_reducer";
import { AddFarmExpenseSchema } from "../../../schema/transactions";
import styles from "./sty;es";

const AddFarmExpense = () => {
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();
  const {
    fetching,
    fetchingCategoryActivities,
    farmData,
    categoryActivities,
    error,
    categoryActivitiesError,
    farmActivities,
  } = useSelector(farmSelector) as FarmState;
  const { addingFarmExpense, addFarmExpenseError, addFarmExpenseMessage } = useSelector(
    transactionsSelector
  ) as TransactionsState;
  const [selectedFarm, setSelectedFarm] = useState<any>("Select Farm");
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [farm_id, setFarmId] = useState<number | any>(null);
  const [category_id, setCategoryId] = useState<number | any>(null);
  const [farm_activity_id, setFarmActivtyId] = useState<number | any>(null);
  const [crop, setCrop] = useState<string | any>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [date, setDate] = useState(null);
  const [categoryActivities2, setCategoryActivities] = useState<any>(null);
  const [errorSnackbarVisible, setErrorSnackbarVisible] = useState<boolean>(false);
  const [infoSnackbarVisible, setInfoSnackbarVisible] = useState<boolean>(false);
  const [tempValues, setTempValues] = useState<AddFarmExpenseInput | any>(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDate = (rawDate: any) => {
    setDate(rawDate.toString().substr(0, 16));
    hideDatePicker();
  };

  useEffect(() => {
    const fetchFarmsProcess = () => {
      dispatch(getFarms());
    };

    if (!farmData) {
      fetchFarmsProcess();
    }
  }, [dispatch, farmActivities, farmData]);

  useEffect(() => {
    const filterCrop = () => {
      for (let i = 0; i < farmData?.length; i++) {
        if (farmData[i].id === farm_id) {
          setCrop(farmData[i]?.crops[0]?.crop?.name);
        }
      }
    };

    filterCrop();
  }, [farmData, farm_id]);

  // Converting categories activities data to an array of objects
  useEffect(() => {
    const convertToArray = () => {
      if (selectedFarm === "Select Farm") {
        return;
      }

      setCategoryActivities([]);
      // const entries = Object.values(categoryActivities);
      const entries = Object.entries(categoryActivities).map((e) => ({
        [e[0]]: e[1],
      }));
      const keyArr: any = [];
      for (let i = 0; i < entries.length; i++) {
        const key = Object.keys(entries[i]);
        const values = Object.values(entries[i]);
        const subValues: any = values;
        const miniValues: any = subValues[0];
        for (let j = 0; j < miniValues.length; j++) {
          keyArr.push({
            category: key[0],
            subCategory: [
              {
                subCategory: miniValues[j]?.subcategory,
                farm_activity_id: miniValues[j]?.activity_id,
              },
            ],
          });
        }
      }
      setCategoryActivities(keyArr);
    };
    convertToArray();
  }, [categoryActivities]);

  useEffect(() => {
    if (addFarmExpenseError) {
      setErrorSnackbarVisible(true);
    }

    if (addFarmExpenseMessage) {
      setInfoSnackbarVisible(true);
    }
  }, [addFarmExpenseError, addFarmExpenseMessage]);

  const getCategoryActivities = (id: number) => {
    dispatch(fetchCategoryActivitesAction(id));
  };

  const retry = async () => {
    if (!farmData) {
      dispatch(getFarms());
    }

    if (!categoryActivities) {
      getCategoryActivities(farm_id);
    }
  };

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

  const submitForm = (values: AddFarmExpenseInput) => {
    setTempValues(values);
    dispatch(addFarmExpenseAction(values));
  };

  return (
    <Wrapper>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.wrapper}>
        <ScrollView>
          <AppbarComponent title="Add Farm Expense" search={false} backButton={true} />
          <Formik
            validationSchema={AddFarmExpenseSchema}
            initialValues={
              {
                farm_id,
                farm_activity_id,
                balance_to_be_paid: "",
                brand: "",
                date,
                note: "",
                technicalities: "",
                quantity: "",
                amount: "",
                unit_price: "",
                lessons_learnt: "",
              } as unknown as AddFarmExpenseInput
            }
            onSubmit={() => {}}
          >
            {({ handleChange, handleBlur, values, errors, setFieldValue }) => (
              <Surface style={styles.surface}>
                <View
                  style={[
                    styles.headingView,
                    {
                      backgroundColor: dark ? combinedDarkTheme.colors.placeholder : combinedDefaultTheme.colors.border,
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
                        color: dark ? combinedDarkTheme.colors.text : combinedDefaultTheme.colors.text,
                      },
                    ]}
                  >
                    Record Finance
                  </Subheading>
                </View>
                {/* Select Farm */}
                <View style={styles.inputView}>
                  <Surface
                    style={[
                      styles.pickerView,
                      {
                        borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.backdrop,
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
                        setFarmId(itemValue?.id);
                        setFieldValue("farm_id", itemValue?.id);
                        if (itemValue?.id) {
                          getCategoryActivities(itemValue?.id);
                        }
                      }}
                      itemStyle={[
                        styles.pickerView,
                        {
                          borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text,
                        },
                      ]}
                    >
                      <Picker.Item
                        color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                        label={"Select Farm"}
                        value={null}
                        style={styles.buttonLabel}
                      />
                      {farmData?.map((item: Farm, index: number) => {
                        return (
                          <Picker.Item
                            key={index}
                            color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                            label={item.name}
                            value={item}
                            style={styles.buttonLabel}
                          />
                        );
                      })}
                    </Picker>
                  </Surface>
                  {errors?.farm_id && (
                    <HelperText type="error" visible={errors?.farm_id ? true : false}>
                      {errors?.farm_id}
                    </HelperText>
                  )}
                </View>
                {farm_id && (
                  <View style={styles.inputView}>
                    <Paragraph>Crop assigned to Farm</Paragraph>
                    <TextInput
                      disabled={true}
                      label={""}
                      value={crop}
                      mode="outlined"
                      selectionColor={colors.text}
                      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                      outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                      style={[
                        styles.buttonLabel,
                        {
                          backgroundColor: dark
                            ? combinedDarkTheme.colors.background
                            : combinedDefaultTheme.colors.surface,
                        },
                      ]}
                    />
                  </View>
                )}

                {fetchingCategoryActivities && (
                  <View style={styles.inputView}>
                    <ProgressBar
                      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                      indeterminate={true}
                      color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.primary}
                    />
                  </View>
                )}

                {categoryActivitiesError && (
                  <View style={styles.inputView}>
                    <Text>Oops! Something went wrong while fetching extra farm data</Text>
                    <Button onPress={retry} uppercase={false} theme={dark ? combinedDarkTheme : combinedDefaultTheme}>
                      Retry
                    </Button>
                  </View>
                )}

                {/* Select Category */}
                {farm_id && !fetchingCategoryActivities && categoryActivities && categoryActivities2 && (
                  <View style={styles.inputView}>
                    <Surface
                      style={[
                        styles.pickerView,
                        {
                          borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.backdrop,
                          backgroundColor: dark
                            ? combinedDarkTheme.colors.background
                            : combinedDefaultTheme.colors.surface,
                        },
                      ]}
                    >
                      <Picker
                        mode="dropdown"
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue: any) => {
                          setSelectedCategory(itemValue);
                          setCategoryId(itemValue?.id);
                          setFieldValue("category_id", itemValue?.id);
                        }}
                        itemStyle={[
                          styles.pickerView,
                          {
                            borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text,
                          },
                        ]}
                      >
                        <Picker.Item
                          color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                          label={"Select Category"}
                          value={null}
                          style={styles.buttonLabel}
                        />

                        {categoryActivities2?.map((item: any, index: number) => {
                          return (
                            <Picker.Item
                              key={index}
                              color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                              label={item.category}
                              value={item}
                              style={styles.buttonLabel}
                            />
                          );
                        })}
                      </Picker>
                    </Surface>
                    {errors?.category_id && (
                      <HelperText type="error" visible={errors?.category_id ? true : false}>
                        {errors?.category_id}
                      </HelperText>
                    )}
                  </View>
                )}

                {/* Farm activity /subcategory */}
                {!fetchingCategoryActivities && selectedCategory && selectedCategory !== "" && (
                  <View style={styles.inputView}>
                    <Surface
                      style={[
                        styles.pickerView,
                        {
                          borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.backdrop,
                          backgroundColor: dark
                            ? combinedDarkTheme.colors.background
                            : combinedDefaultTheme.colors.surface,
                        },
                      ]}
                    >
                      <Picker
                        mode="dropdown"
                        selectedValue={selectedActivity}
                        onValueChange={(itemValue: any) => {
                          setSelectedActivity(itemValue);
                          setFarmActivtyId(itemValue.id);
                          setFieldValue("farm_activity_id", itemValue?.farm_activity_id);
                        }}
                        itemStyle={[
                          styles.pickerView,
                          {
                            borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text,
                          },
                        ]}
                      >
                        <Picker.Item
                          color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                          label={"Select Farm Activity"}
                          value={""}
                          style={styles.buttonLabel}
                        />
                        {selectedCategory.subCategory?.map((item: any, index: number) => {
                          return (
                            <Picker.Item
                              key={index}
                              color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                              label={item.subCategory}
                              value={item}
                              style={styles.buttonLabel}
                            />
                          );
                        })}
                      </Picker>
                    </Surface>
                    {errors?.category_id && (
                      <HelperText type="error" visible={errors?.category_id ? true : false}>
                        {errors?.category_id}
                      </HelperText>
                    )}
                  </View>
                )}

                {/* Brand */}
                <View style={styles.inputView}>
                  <TextInput
                    label="Brand"
                    value={values.brand}
                    onChangeText={handleChange("brand")}
                    mode="outlined"
                    onBlur={handleBlur("brand")}
                    error={errors?.brand ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                    style={[
                      styles.buttonLabel,
                      {
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  />

                  {errors?.brand && (
                    <HelperText type="error" visible={errors?.brand ? true : false}>
                      {errors?.brand}
                    </HelperText>
                  )}
                </View>

                {/* Quantity */}
                <View style={styles.inputView}>
                  <TextInput
                    label="Quantity"
                    value={values.quantity}
                    onChangeText={handleChange("quantity")}
                    mode="outlined"
                    keyboardType="number-pad"
                    onBlur={handleBlur("quantity")}
                    error={errors?.quantity ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                    style={[
                      styles.buttonLabel,
                      {
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  />

                  {errors?.quantity && (
                    <HelperText type="error" visible={errors?.quantity ? true : false}>
                      {errors?.quantity}
                    </HelperText>
                  )}
                </View>

                {/* Price */}
                <View style={styles.inputView}>
                  <TextInput
                    label="Unit Price"
                    value={values.unit_price}
                    onChangeText={handleChange("unit_price")}
                    mode="outlined"
                    keyboardType="number-pad"
                    onBlur={handleBlur("unit_price")}
                    error={errors?.unit_price ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                    style={[
                      styles.buttonLabel,
                      {
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  />

                  {errors?.unit_price && (
                    <HelperText type="error" visible={errors?.unit_price ? true : false}>
                      {errors?.unit_price}
                    </HelperText>
                  )}
                </View>

                {/* Amount */}
                <View style={styles.inputView}>
                  <TextInput
                    label="Amount"
                    value={values.amount}
                    onChangeText={handleChange("amount")}
                    mode="outlined"
                    keyboardType="number-pad"
                    onBlur={handleBlur("amount")}
                    error={errors?.amount ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
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
                    <HelperText type="error" visible={errors?.amount ? true : false}>
                      {errors?.amount}
                    </HelperText>
                  )}
                </View>

                {/* Balance to be paid */}
                <View style={styles.inputView}>
                  <TextInput
                    label="Balance to be paid"
                    value={values.balance_to_be_paid}
                    onChangeText={handleChange("balance_to_be_paid")}
                    mode="outlined"
                    keyboardType="number-pad"
                    onBlur={handleBlur("balance_to_be_paid")}
                    error={errors?.balance_to_be_paid ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                    style={[
                      styles.buttonLabel,
                      {
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  />

                  {errors?.balance_to_be_paid && (
                    <HelperText type="error" visible={errors?.balance_to_be_paid ? true : false}>
                      {errors?.balance_to_be_paid}
                    </HelperText>
                  )}
                </View>

                {/* Start Date */}
                <View style={styles.inputView}>
                  <Button
                    onPress={showDatePicker}
                    uppercase={false}
                    icon="calendar"
                    mode="outlined"
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    style={[
                      styles.pickerView,
                      {
                        borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.backdrop,
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  >
                    {date ?? "Select Date"}
                  </Button>
                </View>

                {/* Technicalities */}
                {/* <View style={styles.inputView}>
                  <TextInput
                    label="Technicalities"
                    multiline={true}
                    numberOfLines={8}
                    value={values.technicalities}
                    onChangeText={handleChange("technicalities")}
                    mode="outlined"
                    onBlur={handleBlur("technicalities")}
                    error={errors?.note ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                    style={styles.buttonLabel}
                  />

                  {errors?.technicalities && (
                    <HelperText type="error" visible={errors?.technicalities ? true : false}>
                      {errors?.technicalities}
                    </HelperText>
                  )}
                </View> */}

                {/* Lessons lesrtn */}
                {/* <View style={styles.inputView}>
                  <TextInput
                    label="Lessons learnt"
                    multiline={true}
                    numberOfLines={8}
                    value={values.lessons_learnt}
                    onChangeText={handleChange("lessons_learnt")}
                    mode="outlined"
                    onBlur={handleBlur("lessons_learnt")}
                    error={errors?.note ? true : false}
                    selectionColor={colors.text}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                    style={styles.buttonLabel}
                  />

                  {errors?.note && (
                    <HelperText type="error" visible={errors?.note ? true : false}>
                      {errors?.note}
                    </HelperText>
                  )}
                </View> */}

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
                    outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                    style={styles.buttonLabel}
                  />

                  {errors?.note && (
                    <HelperText type="error" visible={errors?.note ? true : false}>
                      {errors?.note}
                    </HelperText>
                  )}
                </View>

                <Button
                  onPress={() => {
                    submitForm(values);
                  }}
                  uppercase={false}
                  theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                  mode="contained"
                  style={styles.submit}
                  loading={addingFarmExpense}
                  labelStyle={[
                    styles.buttonLabel,
                    {
                      color: dark ? combinedDarkTheme.colors.background : combinedDefaultTheme.colors.background,
                    },
                  ]}
                >
                  Submit
                </Button>

                {/* Date */}
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={(e) => {
                    setFieldValue("date", e);
                    handleDate(e);
                  }}
                  onCancel={hideDatePicker}
                />
              </Surface>
            )}
          </Formik>
        </ScrollView>
        {addFarmExpenseError && (
          <ErrorSnackbar
            action={() => submitForm(tempValues)}
            error={addFarmExpenseError}
            setVisible={setErrorSnackbarVisible}
            visible={errorSnackbarVisible}
          />
        )}
        {addFarmExpenseMessage && (
          <InfoSnackbar
            info={addFarmExpenseMessage}
            setVisible={setInfoSnackbarVisible}
            visible={infoSnackbarVisible}
          />
        )}
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default AddFarmExpense;
