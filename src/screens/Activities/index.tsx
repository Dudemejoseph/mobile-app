import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Button,
  HelperText,
  Paragraph,
  ProgressBar,
  Subheading,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../components/Shared/Appbar";
import ErrorComponent from "../../components/Shared/ErrorComponent";
import LoadingComponent from "../../components/Shared/LoadingComponent";
import ErrorSnackbar from "../../components/Shared/Snackbar/ErrorSnackbar";
import InfoSnackbar from "../../components/Shared/Snackbar/InfoSnackbar";
import Wrapper from "../../components/Shared/Wrapper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../constants/theme";
import { Farm, FarmState, RecordActivityInput } from "../../interfaces/farm";
import { UtilitiesState } from "../../interfaces/utilities";
import {
  fetchCategoryActivitesAction,
  getFarms,
  recordActivityAction,
} from "../../redux/features/farms/farm_actions";
import { farmSelector } from "../../redux/features/farms/farm_reducer";
import { utlitiesSelector } from "../../redux/features/utilities/utilties_reducer";
import styles from "./styles";

const Activities = () => {
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
    recordingActivity,
    recordActivityError,
    recordActivityMessage,
  } = useSelector(farmSelector) as FarmState;

  const { categoriesData } = useSelector(utlitiesSelector) as UtilitiesState;
  const [selectedFarm, setSelectedFarm] = useState<any>("Select Farm");
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [farm_id, setFarmId] = useState<number | any>(null);
  const [category_id, setCategoryId] = useState<number | any>(null);
  const [farm_activity_id, setFarmActivtyId] = useState<number | any>(null);
  const [crop_id, setCropId] = useState<number | any>(null);
  const [crop, setCrop] = useState<string | any>(null);
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] =
    useState<boolean>(false);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [categoryActivities2, setCategoryActivities] = useState<any>(null);
  const [tempValues, setTempValues] = useState<RecordActivityInput | any>(null);
  const [errorSnackbarVisible, setErrorSnackbarVisible] =
    useState<boolean>(false);
  const [infoSnackbarVisible, setInfoSnackbarVisible] =
    useState<boolean>(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleStartDate = (date: any) => {
    setStartDate(date.toString().substr(0, 16));
    hideDatePicker();
  };

  const handleEndDate = (date: any) => {
    setEndDate(date.toString().substr(0, 16));
    hideDatePicker2();
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
          setCropId(farmData[i]?.crops[0]?.crop?.id);
        }
      }
    };

    filterCrop();
  }, [farmData, farm_id]);

  useEffect(() => {
    if (recordActivityError) {
      setErrorSnackbarVisible(true);
    }

    if (recordActivityMessage) {
      setInfoSnackbarVisible(true);
    }
  }, [recordActivityError, recordActivityMessage]);

  // Converting categories activities data to an array of objects
  useEffect(() => {
    const convertToArray = () => {
      // const entries = Object.values(categoryActivities);
      const entries = Object.entries(categoryActivities).map((e) => ({
        [e[0]]: e[1],
      }));
      let keyArr: any = [];
      for (let i = 0; i < entries.length; i++) {
        let key = Object.keys(entries[i]);
        let values = Object.values(entries[i]);
        let subValues: any = values;
        let miniValues: any = subValues[0];
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
    if (categoryActivities && !categoryActivities2) {
      convertToArray();
    }
  }, [categoryActivities, categoryActivities2]);

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

  const submitForm = (values: RecordActivityInput) => {
    setTempValues(values);
    dispatch(recordActivityAction(values));
  };

  return (
    <Wrapper>
      <ScrollView>
        <AppbarComponent title="Activities" backButton={true} />
        <Formik
          validationSchema={null}
          initialValues={
            {
              farm_id: farm_id,
              farm_activity_id: farm_activity_id,
              category_id: category_id,
              note: "",
              start_date: start_date,
              end_date: end_date,
              crop_id: crop_id,
            } as RecordActivityInput
          }
          onSubmit={() => {}}
        >
          {({ errors, setFieldValue, values }) => (
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
                  Record Activity
                </Subheading>
              </View>

              {/* Select Farm */}
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
                      setFarmId(itemValue?.id);
                      setFieldValue("farm_id", itemValue?.id);
                      if (itemValue?.id) {
                        getCategoryActivities(itemValue?.id);
                      }
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
                      label={"Select Farm"}
                      value={null}
                      style={styles.buttonLabel}
                    />
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
                </View>
              )}

              {fetchingCategoryActivities && (
                <View style={styles.inputView}>
                  <ProgressBar
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    indeterminate={true}
                    color={
                      dark
                        ? combinedDarkTheme.colors.primary
                        : combinedDefaultTheme.colors.primary
                    }
                  />
                </View>
              )}

              {categoryActivitiesError && (
                <View style={styles.inputView}>
                  <Text>
                    Oops! Something went wrong while fetching extra farm data
                  </Text>
                  <Button
                    onPress={retry}
                    uppercase={false}
                    theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                  >
                    Retry
                  </Button>
                </View>
              )}

              {/* Select Category */}
              {farm_id && categoryActivities && categoryActivities2 && (
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
                      selectedValue={selectedCategory}
                      onValueChange={(itemValue: any, index: number) => {
                        setSelectedCategory(itemValue);
                        setCategoryId(index + 1);
                        setFieldValue("category_id", index + 1);
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
                        label={"Select Category"}
                        value={null}
                        style={styles.buttonLabel}
                      />

                      {categoryActivities2?.map((item: any, index: number) => {
                        return (
                          <Picker.Item
                            key={index}
                            color={
                              dark
                                ? combinedDarkTheme.colors.primary
                                : combinedDefaultTheme.colors.text
                            }
                            label={item.category}
                            value={item}
                            style={styles.buttonLabel}
                          />
                        );
                      })}
                    </Picker>
                  </Surface>
                  {errors?.category_id && (
                    <HelperText
                      type="error"
                      visible={errors?.category_id ? true : false}
                    >
                      {errors?.category_id}
                    </HelperText>
                  )}
                </View>
              )}

              {/* Farm activity /subcategory */}
              {selectedCategory && selectedCategory !== "" && (
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
                      selectedValue={selectedActivity}
                      onValueChange={(itemValue: any) => {
                        setSelectedActivity(itemValue);
                        setFarmActivtyId(itemValue.id);
                        setFieldValue("farm_activity_id", itemValue?.id);
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
                        label={"Select Farm Activity"}
                        value={""}
                        style={styles.buttonLabel}
                      />
                      {selectedCategory.subCategory?.map(
                        (item: any, index: number) => {
                          return (
                            <Picker.Item
                              key={index}
                              color={
                                dark
                                  ? combinedDarkTheme.colors.primary
                                  : combinedDefaultTheme.colors.text
                              }
                              label={item.subCategory}
                              value={item}
                              style={styles.buttonLabel}
                            />
                          );
                        }
                      )}
                    </Picker>
                  </Surface>
                  {errors?.category_id && (
                    <HelperText
                      type="error"
                      visible={errors?.category_id ? true : false}
                    >
                      {errors?.category_id}
                    </HelperText>
                  )}
                </View>
              )}

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
                      borderColor: dark
                        ? combinedDarkTheme.colors.primary
                        : combinedDefaultTheme.colors.backdrop,
                      backgroundColor: dark
                        ? combinedDarkTheme.colors.background
                        : combinedDefaultTheme.colors.surface,
                    },
                  ]}
                >
                  {start_date ?? "Select Start Date"}
                </Button>
              </View>

              {/* End Date */}
              <View style={styles.inputView}>
                <Button
                  onPress={showDatePicker2}
                  uppercase={false}
                  icon="calendar"
                  mode="outlined"
                  theme={dark ? combinedDarkTheme : combinedDefaultTheme}
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
                  {end_date ?? "Select End Date"}
                </Button>
              </View>

              {/* Technicalities */}
              <View style={styles.inputView}>
                <TextInput
                  label="Technicalities"
                  multiline={true}
                  numberOfLines={8}
                  // value={values.note}
                  // onChangeText={handleChange("note")}
                  mode="outlined"
                  // onBlur={handleBlur("note")}
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

              {/* Note */}
              <View style={styles.inputView}>
                <TextInput
                  label="Note"
                  multiline={true}
                  numberOfLines={8}
                  // value={values.note}
                  // onChangeText={handleChange("note")}
                  mode="outlined"
                  // onBlur={handleBlur("note")}
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

              {/* Submit button */}
              <Button
                onPress={() => {
                  submitForm(values);
                }}
                uppercase={false}
                theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                mode="contained"
                style={styles.submit}
                loading={recordingActivity}
                labelStyle={[
                  styles.buttonLabel,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.background
                      : combinedDefaultTheme.colors.background,
                  },
                ]}
              >
                Record
              </Button>

              {/* Start date */}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleStartDate}
                onCancel={hideDatePicker}
              />

              {/* End date */}
              <DateTimePickerModal
                isVisible={isDatePickerVisible2}
                mode="date"
                onConfirm={handleEndDate}
                onCancel={hideDatePicker2}
              />
            </Surface>
          )}
        </Formik>
        {recordActivityError &&
          ErrorSnackbar(
            errorSnackbarVisible,
            setErrorSnackbarVisible,
            recordActivityError,
            () => submitForm(tempValues)
          )}
        {recordActivityMessage &&
          InfoSnackbar(
            infoSnackbarVisible,
            setInfoSnackbarVisible,
            recordActivityMessage
          )}
      </ScrollView>
    </Wrapper>
  );
};

export default Activities;
