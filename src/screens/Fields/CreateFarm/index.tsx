import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Button, HelperText, Paragraph, Subheading, Surface, TextInput, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../../components/Shared/Appbar";
import ErrorComponent from "../../../components/Shared/ErrorComponent";
import LoadingComponent from "../../../components/Shared/LoadingComponent";
import ErrorSnackbar from "../../../components/Shared/Snackbar/ErrorSnackbar";
import InfoSnackbar from "../../../components/Shared/Snackbar/InfoSnackbar";
import Wrapper from "../../../components/Shared/Wrapper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";
import { Crop } from "../../../interfaces/crop";
import { CreateFarmInput, FarmState } from "../../../interfaces/farm";
import { DefaultScreenProps } from "../../../interfaces/shared_components";
import { UtilitiesState } from "../../../interfaces/utilities";
import { createFarm } from "../../../redux/features/farms/farm_actions";
import { farmSelector } from "../../../redux/features/farms/farm_reducer";
import { utlitiesSelector } from "../../../redux/features/utilities/utilties_reducer";
import { fetchCountries, fetchCrops, fetchStates } from "../../../redux/features/utilities/utlities_actions";
import { CreateFarmSchema } from "../../../schema/farm";
import { ownerships, sizes } from "../../../utils/utilsData";
import styles from "./styles";

const CreateFarm: React.FC<DefaultScreenProps> = ({ route }) => {
  const dispatch = useDispatch();
  let hecres = route?.params?.hecres ?? 0;
  let coordinates = route?.params?.coordinates;
  let distance = route?.params?.distance ?? 0;
  const { colors, dark } = useTheme();
  const {
    countriesData,
    cropsData,
    statesData,
    fetchingCountriesError,
    fetchingCropsError,
    fetchingCountries,
    fetchingCrops,
    fetchingStates,
    fetchingStatesError,
  } = useSelector(utlitiesSelector) as UtilitiesState;
  const { creatingFarm, creatingFarmError, creatingFarmMessage } = useSelector(farmSelector) as FarmState;
  const [errorSnackbarVisible, setErrorSnackbarVisible] = useState<boolean>(false);
  const [infoSnackbarVisible, setInfoSnackbarVisible] = useState<boolean>(false);
  const country_id = 161;
  const [state_id, setStateID] = useState<number>(0);
  const [crop_id, setCropID] = useState<number>(0);
  const [lgas, setLGAS] = useState<[]>([]);
  const [lga_id, setLGA] = useState<number>(null);
  const [selectedLGA, setSelectedLGA] = useState<string>("LGA");
  const [selectedState, setSelectedState] = useState<string>("State");
  const [name, setName] = useState("");
  const [crop, setCrop] = useState("Select crop");
  const [size_unit, setUnit] = useState<string | any>("Select unit");
  const [location, setLocation] = useState<string>("");
  const [ownership, setOwnership] = useState<string>("Ownership");
  const [size] = useState(hecres);

  useEffect(() => {
    const getCountries = async () => {
      dispatch(fetchCountries());
    };
    const getStates = async () => {
      dispatch(fetchStates());
    };
    const getCrops = async () => {
      dispatch(fetchCrops());
    };

    if (!countriesData) {
      getCountries();
    }
    if (!statesData) {
      getStates();
    }
    if (!cropsData) {
      getCrops();
    }
  }, [countriesData, cropsData, dispatch, statesData]);

  const retry = async () => {
    if (!countriesData) {
      dispatch(fetchCountries());
    }
    if (!statesData) {
      dispatch(fetchStates());
    }
    if (!cropsData) {
      dispatch(fetchCrops());
    }
  };

  const submitForm = async () => {
    const data = {
      name,
      size: Number(size),
      size_unit: size_unit.name,
      location,
      location_type: "address",
      ownership,
      coordinates: "",
      country_id,
      state_id,
      lga_id,
      crop_id,
    };
    dispatch(createFarm(data as CreateFarmInput));
  };

  useEffect(() => {
    if (creatingFarmError) {
      setErrorSnackbarVisible(true);
    }

    if (creatingFarmMessage) {
      setInfoSnackbarVisible(true);
    }
  }, [creatingFarmError, creatingFarmMessage]);

  if (fetchingCountries || fetchingCrops || fetchingStates) {
    return <LoadingComponent />;
  }

  if (fetchingCountriesError || fetchingCropsError || fetchingStatesError) {
    return (
      <ErrorComponent
        error={fetchingCountriesError ?? fetchingCropsError ?? fetchingStatesError}
        loading={
          (fetchingCountriesError && fetchingCountries) ??
          (fetchingCropsError && fetchingCrops) ??
          (fetchingStatesError && fetchingStates)
        }
        action={() => {
          retry();
        }}
      />
    );
  }

  return (
    <Wrapper>
      <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppbarComponent title="Create Farm" backButton={true} search={false} />
          <Formik
            validationSchema={CreateFarmSchema}
            initialValues={
              {
                name: "",
                size_unit: size_unit,
                crop_id: crop_id,
                lga_id: lga_id,
                country_id: country_id,
                ownership: "owned",
                location_type: "address",
                location: "",
                state_id: state_id,
                coordinates: coordinates,
              } as CreateFarmInput
            }
            onSubmit={() => {}}
          >
            {({ handleChange, handleBlur, values, errors, setFieldValue, isValid }) => (
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
                    Create Farm
                  </Subheading>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    label="Farm Name"
                    value={values.name}
                    onChangeText={(value: any) => {
                      setFieldValue("name", value);
                      setName(value);
                    }}
                    mode="outlined"
                    onBlur={handleBlur("name")}
                    error={errors?.name ? true : false}
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

                  {errors?.name && (
                    <HelperText type="error" visible={errors?.name ? true : false}>
                      {errors?.name}
                    </HelperText>
                  )}
                </View>

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
                      selectedValue={crop}
                      onValueChange={(itemValue: any) => {
                        setCrop(itemValue);
                        setCropID(itemValue.id);
                        setFieldValue("crop_id", itemValue.id);
                      }}
                      itemStyle={[
                        styles.pickerView,
                        {
                          borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text,
                        },
                      ]}
                    >
                      {cropsData?.map((item: Crop, index: number) => {
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
                  {errors?.crop_id && (
                    <HelperText type="error" visible={errors?.crop_id ? true : false}>
                      {errors?.crop_id}
                    </HelperText>
                  )}
                </View>

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
                      selectedValue={size_unit}
                      onValueChange={(itemValue: any) => {
                        setUnit(itemValue);
                        setFieldValue("size_unit", itemValue);
                      }}
                      itemStyle={[
                        styles.pickerView,
                        {
                          borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text,
                        },
                      ]}
                    >
                      {sizes?.map((item: any, index: number) => {
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
                  {errors?.size_unit && (
                    <HelperText type="error" visible={errors?.size_unit ? true : false}>
                      {errors?.size_unit}
                    </HelperText>
                  )}
                </View>

                <View style={styles.inputView}>
                  <Paragraph>Farm Size</Paragraph>
                  <TextInput
                    disabled={true}
                    label=""
                    value={size_unit?.name === "sqm (square meters)" ? "" + distance.toString() : hecres.toString()}
                    onChangeText={handleChange("size")}
                    mode="outlined"
                    onBlur={handleBlur("size")}
                    error={errors?.size ? true : false}
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
                      selectedValue={ownership}
                      onValueChange={(itemValue: any) => {
                        setOwnership(itemValue);
                        setFieldValue("ownership", itemValue);
                      }}
                      itemStyle={[
                        styles.pickerView,
                        {
                          borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text,
                        },
                      ]}
                    >
                      {ownerships?.map((item: any, index: number) => {
                        return (
                          <Picker.Item
                            key={index}
                            color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                            label={item.name}
                            value={item.name}
                            style={styles.buttonLabel}
                          />
                        );
                      })}
                    </Picker>
                  </Surface>
                  {errors?.ownership && (
                    <HelperText type="error" visible={errors?.ownership ? true : false}>
                      {errors?.ownership}
                    </HelperText>
                  )}
                </View>

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
                      selectedValue={selectedState}
                      onValueChange={(itemValue: any, index: number) => {
                        setStateID(index + 1);
                        setLGAS(itemValue.lgas);
                        setSelectedState(itemValue);
                        setFieldValue("state_id", index + 1);
                      }}
                      itemStyle={[
                        styles.pickerView,
                        {
                          borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text,
                        },
                      ]}
                    >
                      {statesData?.map((item: any, index: number) => {
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
                  {errors?.state_id && (
                    <HelperText type="error" visible={errors?.state_id ? true : false}>
                      {errors?.state_id}
                    </HelperText>
                  )}
                </View>

                {lgas?.length > 0 && (
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
                        selectedValue={selectedLGA}
                        onValueChange={(itemValue: any) => {
                          setSelectedLGA(itemValue);
                          setLGA(itemValue.id);
                          setFieldValue("lga_id", itemValue.id);
                        }}
                        itemStyle={[
                          styles.pickerView,
                          {
                            borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text,
                          },
                        ]}
                      >
                        {lgas?.map((item: any, index: number) => {
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
                    {errors?.lga_id && (
                      <HelperText type="error" visible={errors?.lga_id ? true : false}>
                        {errors?.lga_id}
                      </HelperText>
                    )}
                  </View>
                )}

                <View style={styles.inputView}>
                  <TextInput
                    label="Address"
                    value={values.location}
                    onChangeText={(value: any) => {
                      setFieldValue("location", value);
                      setLocation(value);
                    }}
                    mode="outlined"
                    onBlur={handleBlur("location")}
                    error={errors?.name ? true : false}
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

                  {errors?.location && (
                    <HelperText type="error" visible={errors?.location ? true : false}>
                      {errors?.location}
                    </HelperText>
                  )}
                </View>

                <Button
                  onPress={() => {
                    submitForm();
                  }}
                  uppercase={false}
                  theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                  mode="contained"
                  style={styles.submit}
                  loading={creatingFarm}
                  labelStyle={[
                    styles.buttonLabel,
                    {
                      color: dark ? combinedDarkTheme.colors.background : combinedDefaultTheme.colors.background,
                    },
                  ]}
                >
                  Submit
                </Button>
              </Surface>
            )}
          </Formik>
        </ScrollView>
        {creatingFarmError &&
          ErrorSnackbar(errorSnackbarVisible, setErrorSnackbarVisible, creatingFarmError, () => submitForm())}
        {creatingFarmMessage && InfoSnackbar(infoSnackbarVisible, setInfoSnackbarVisible, creatingFarmMessage)}
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default CreateFarm;
